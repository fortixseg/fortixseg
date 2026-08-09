$envPath = Join-Path $PSScriptRoot "..\.env.vercel-teste"
$vars = @{}
foreach ($line in Get-Content $envPath) {
  $trimmed = $line.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) { continue }
  $parts = $trimmed.Split("=", 2)
  if ($parts.Count -eq 2) { $vars[$parts[0].Trim()] = $parts[1] }
}

$tests = @(
  @{ Label = "Aluno"; Email = $vars["FORTIXSEG_STUDENT_EMAIL"]; Password = $vars["FORTIXSEG_STUDENT_PASSWORD"] },
  @{ Label = "Empresa"; Email = $vars["FORTIXSEG_COMPANY_EMAIL"]; Password = $vars["FORTIXSEG_COMPANY_PASSWORD"] },
  @{ Label = "Afiliado"; Email = $vars["FORTIXSEG_AFFILIATE_EMAIL"]; Password = $vars["FORTIXSEG_AFFILIATE_PASSWORD"] },
  @{ Label = "Admin"; Email = $vars["FORTIXSEG_ADMIN_EMAIL"]; Password = $vars["FORTIXSEG_ADMIN_PASSWORD"] }
)

foreach ($test in $tests) {
  try {
    $body = @{ email = $test.Email; password = $test.Password } | ConvertTo-Json -Compress
    $response = Invoke-WebRequest -Uri "https://fortixseg-plataforma.vercel.app/api/auth/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 30
    $json = $response.Content | ConvertFrom-Json
    Write-Output "$($test.Label)=OK role=$($json.user.role)"
  } catch {
    $status = ""
    if ($_.Exception.Response) { $status = " status=$([int]$_.Exception.Response.StatusCode)" }
    Write-Output "$($test.Label)=ERRO$status"
  }
}
