$envPath = Join-Path $PSScriptRoot "..\.env.vercel-teste"
$pdfPath = Join-Path $PSScriptRoot "..\assets\apostila-nr35-demonstrativa.pdf"
$baseUrl = "https://fortixseg-plataforma.vercel.app"

$vars = @{}
foreach ($line in Get-Content $envPath) {
  $trimmed = $line.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) { continue }
  $parts = $trimmed.Split("=", 2)
  if ($parts.Count -eq 2) { $vars[$parts[0].Trim()] = $parts[1] }
}

try {
  $loginBody = @{
    email = $vars["FORTIXSEG_ADMIN_EMAIL"]
    password = $vars["FORTIXSEG_ADMIN_PASSWORD"]
  } | ConvertTo-Json -Compress

  $login = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -UseBasicParsing -TimeoutSec 30 -SessionVariable session
  $loginJson = $login.Content | ConvertFrom-Json
  Write-Output "LOGIN=OK role=$($loginJson.user.role)"
  $headers = @{ Authorization = "Bearer $($loginJson.token)" }

  $list = Invoke-WebRequest -Uri "$baseUrl/api/admin/interactive-courses" -Method GET -UseBasicParsing -TimeoutSec 30 -Headers $headers
  Write-Output "LISTA=OK status=$([int]$list.StatusCode)"

  $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
  $data = "data:application/pdf;base64,$([System.Convert]::ToBase64String($bytes))"
  $generateBody = @{
    title = "NR-35 - Teste Produção por PDF"
    category = "Trabalho em altura"
    hours = 8
    minimumGrade = 70
    attempts = 3
    responsible = "Responsavel tecnico de teste"
    name = [System.IO.Path]::GetFileName($pdfPath)
    data = $data
  } | ConvertTo-Json -Compress

  $generated = Invoke-WebRequest -Uri "$baseUrl/api/admin/interactive-courses/generate" -Method POST -Body $generateBody -ContentType "application/json" -UseBasicParsing -TimeoutSec 120 -Headers $headers
  $json = $generated.Content | ConvertFrom-Json
  Write-Output "GERADOR=OK"
  Write-Output "TEMPLATE=$($json.course.detectedTemplate)"
  Write-Output "EXTRACAO=$($json.course.pdf.extractionStatus)"
  Write-Output "EXTRACAO_ERRO=$($json.course.pdf.extractionError)"
  Write-Output "STORAGE=$($json.course.pdf.storage)"
  Write-Output "MODULOS=$($json.course.stats.modules)"
  Write-Output "AULAS=$($json.course.stats.lessons)"
  Write-Output "QUESTOES=$($json.course.stats.questions)"
} catch {
  Write-Output "ERRO=$($_.Exception.Message)"
  if ($_.Exception.Response) {
    Write-Output "STATUS=$([int]$_.Exception.Response.StatusCode)"
    try {
      $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
      Write-Output "BODY=$($reader.ReadToEnd())"
    } catch {}
  }
}
