$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$port = "3020"
$env:PORT = $port
$envFile = Join-Path $root ".env.vercel-teste"
if (Test-Path $envFile) {
  foreach ($line in Get-Content $envFile) {
    $trimmed = $line.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) { continue }
    $parts = $trimmed.Split("=", 2)
    if ($parts.Count -eq 2 -and $parts[0].Trim() -and -not [string]::IsNullOrWhiteSpace($parts[1])) {
      [Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1], "Process")
    }
  }
}
$proc = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $root -PassThru -WindowStyle Hidden

try {
  $ready = $false
  for ($i = 0; $i -lt 30; $i += 1) {
    try {
      $health = Invoke-WebRequest -Uri "http://127.0.0.1:$port/api/health" -UseBasicParsing -TimeoutSec 2
      if ($health.StatusCode -eq 200) {
        $ready = $true
        break
      }
    } catch {
      Start-Sleep -Milliseconds 500
    }
  }

  if (-not $ready) {
    throw "Servidor local nao respondeu na porta $port."
  }

  $loginBody = @{
    email = $env:FORTIXSEG_ADMIN_EMAIL
    password = $env:FORTIXSEG_ADMIN_PASSWORD
  } | ConvertTo-Json -Compress

  $login = Invoke-WebRequest -Uri "http://127.0.0.1:$port/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -UseBasicParsing -TimeoutSec 20
  $loginJson = $login.Content | ConvertFrom-Json
  $headers = @{ Authorization = "Bearer $($loginJson.token)" }

  $pdfPath = Join-Path $root "assets\apostila-nr35-demonstrativa.pdf"
  $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
  $data = "data:application/pdf;base64,$([System.Convert]::ToBase64String($bytes))"
  $body = @{
    title = "NR-35 - Teste Local PDF Interativo"
    category = "Trabalho em altura"
    hours = 8
    minimumGrade = 70
    attempts = 3
    responsible = "Responsavel tecnico de teste"
    name = [System.IO.Path]::GetFileName($pdfPath)
    data = $data
  } | ConvertTo-Json -Compress

  $generated = Invoke-WebRequest -Uri "http://127.0.0.1:$port/api/admin/interactive-courses/generate" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 120 -Headers $headers
  $json = $generated.Content | ConvertFrom-Json
  $firstLesson = $json.course.modules | Where-Object { $_.lessons.Count -gt 0 } | Select-Object -First 1

  Write-Output "LOGIN=OK role=$($loginJson.user.role)"
  Write-Output "GERADOR=OK"
  Write-Output "TEMPLATE=$($json.course.detectedTemplate)"
  Write-Output "EXTRACAO=$($json.course.pdf.extractionStatus)"
  Write-Output "STORAGE=$($json.course.pdf.storage)"
  Write-Output "MODULOS=$($json.course.stats.modules)"
  Write-Output "AULAS=$($json.course.stats.lessons)"
  Write-Output "QUESTOES=$($json.course.stats.questions)"
  Write-Output "PRIMEIRA_AULA=$($firstLesson.lessons[0].title)"
} finally {
  Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
