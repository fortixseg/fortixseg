$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$envPath = Join-Path $projectRoot ".env.vercel-teste"
$vars = @{}
if (Test-Path $envPath) {
  foreach ($line in Get-Content $envPath) {
    $trimmed = $line.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) { continue }
    $parts = $trimmed.Split("=", 2)
    if ($parts.Count -eq 2) { $vars[$parts[0].Trim()] = $parts[1] }
  }
}

$port = 3036
$baseUrl = "http://127.0.0.1:$port"
$pdfPath = Join-Path $projectRoot "assets\apostila-nr35-demonstrativa.pdf"
if (!(Test-Path $pdfPath)) {
  $pdfPath = (Get-ChildItem -Path (Join-Path $projectRoot "assets") -Recurse -Filter *.pdf | Select-Object -First 1).FullName
}
if (!(Test-Path $pdfPath)) { throw "Nenhum PDF de teste encontrado." }

$env:PORT = "$port"
$env:FORTIXSEG_ADMIN_EMAIL = $vars["FORTIXSEG_ADMIN_EMAIL"]
$env:FORTIXSEG_ADMIN_PASSWORD = $vars["FORTIXSEG_ADMIN_PASSWORD"]
$env:FORTIXSEG_SESSION_SECRET = "local-admin-course-test-secret"
$env:PUBLIC_BASE_URL = $baseUrl

$server = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $projectRoot -PassThru -WindowStyle Hidden
try {
  $ready = $false
  for ($i = 0; $i -lt 30; $i++) {
    try {
      $health = Invoke-WebRequest -Uri "$baseUrl/api/health" -UseBasicParsing -TimeoutSec 2
      if ($health.StatusCode -eq 200) { $ready = $true; break }
    } catch {
      Start-Sleep -Milliseconds 500
    }
  }
  if (!$ready) { throw "Servidor local nao respondeu." }

  $loginBody = @{
    email = $env:FORTIXSEG_ADMIN_EMAIL
    password = $env:FORTIXSEG_ADMIN_PASSWORD
  } | ConvertTo-Json -Compress
  $login = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -UseBasicParsing -TimeoutSec 15
  $loginJson = $login.Content | ConvertFrom-Json
  $headers = @{ Authorization = "Bearer $($loginJson.token)" }
  Write-Output "LOGIN_ADMIN=OK"

  $stamp = Get-Date -Format "yyyyMMddHHmmss"
  $courseBody = @{
    title = "Teste CRUD PDF $stamp"
    code = "TESTE-PDF-$stamp"
    category = "Seguranca do Trabalho"
    hours = 4
    price = 99.9
    lessons = 3
    minimumGrade = 70
    attempts = 3
    status = "draft"
    audience = "Teste tecnico"
    objective = "Validar cadastro, edicao, PDF e exclusao"
    syllabus = @("Modulo inicial", "Apostila PDF", "Avaliacao")
  } | ConvertTo-Json -Depth 5 -Compress
  $created = Invoke-WebRequest -Uri "$baseUrl/api/admin/courses" -Method POST -Body $courseBody -ContentType "application/json" -UseBasicParsing -TimeoutSec 20 -Headers $headers
  $createdJson = $created.Content | ConvertFrom-Json
  $courseId = $createdJson.course.id
  Write-Output "CRIAR_CURSO=OK id=$courseId"

  $updateBody = @{
    title = "Teste CRUD PDF $stamp atualizado"
    code = "TESTE-PDF-$stamp"
    category = "Seguranca do Trabalho"
    hours = 6
    price = 129.9
    lessons = 4
    minimumGrade = 75
    attempts = 2
    status = "draft"
    audience = "Teste tecnico atualizado"
    objective = "Validar botao editar"
    syllabus = @("Modulo atualizado", "PDF anexado", "Revisao")
  } | ConvertTo-Json -Depth 5 -Compress
  Invoke-WebRequest -Uri "$baseUrl/api/admin/courses/$courseId" -Method PUT -Body $updateBody -ContentType "application/json" -UseBasicParsing -TimeoutSec 20 -Headers $headers | Out-Null
  Write-Output "EDITAR_CURSO=OK"

  $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
  $dataUrl = "data:application/pdf;base64," + [Convert]::ToBase64String($bytes)
  $resourceBody = @{
    name = [System.IO.Path]::GetFileName($pdfPath)
    data = $dataUrl
  } | ConvertTo-Json -Depth 5 -Compress
  $resource = Invoke-WebRequest -Uri "$baseUrl/api/admin/courses/$courseId/resources" -Method POST -Body $resourceBody -ContentType "application/json" -UseBasicParsing -TimeoutSec 90 -Headers $headers
  $resourceJson = $resource.Content | ConvertFrom-Json
  Write-Output "ANEXAR_PDF=OK resource=$($resourceJson.resource.id)"

  Invoke-WebRequest -Uri "$baseUrl/api/admin/courses/$courseId/resources/$($resourceJson.resource.id)" -Method DELETE -UseBasicParsing -TimeoutSec 20 -Headers $headers | Out-Null
  Write-Output "EXCLUIR_PDF=OK"

  Invoke-WebRequest -Uri "$baseUrl/api/admin/courses/$courseId" -Method DELETE -UseBasicParsing -TimeoutSec 20 -Headers $headers | Out-Null
  Write-Output "EXCLUIR_CURSO=OK"
} finally {
  if ($server -and !$server.HasExited) {
    Stop-Process -Id $server.Id -Force
  }
}
