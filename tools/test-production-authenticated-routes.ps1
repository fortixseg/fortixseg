$ErrorActionPreference = "Stop"

$baseUrl = "https://fortixseg-plataforma.vercel.app"
$envPath = Join-Path $PSScriptRoot "..\.env.vercel-teste"
$vars = @{}
foreach ($line in Get-Content $envPath) {
  $trimmed = $line.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) { continue }
  $parts = $trimmed.Split("=", 2)
  if ($parts.Count -eq 2) { $vars[$parts[0].Trim()] = $parts[1] }
}

$profiles = @(
  @{ Name = "Aluno"; Email = $vars["FORTIXSEG_STUDENT_EMAIL"]; Password = $vars["FORTIXSEG_STUDENT_PASSWORD"]; Routes = @("/api/student/dashboard", "/api/student/interactive-courses") },
  @{ Name = "Empresa"; Email = $vars["FORTIXSEG_COMPANY_EMAIL"]; Password = $vars["FORTIXSEG_COMPANY_PASSWORD"]; Routes = @("/api/company/dashboard") },
  @{ Name = "Admin"; Email = $vars["FORTIXSEG_ADMIN_EMAIL"]; Password = $vars["FORTIXSEG_ADMIN_PASSWORD"]; Routes = @("/api/admin/dashboard", "/api/admin/courses", "/api/admin/users", "/api/admin/interactive-courses") }
)

foreach ($profile in $profiles) {
  $body = @{
    email = $profile.Email
    password = $profile.Password
  } | ConvertTo-Json -Compress
  $login = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -TimeoutSec 30
  $json = $login.Content | ConvertFrom-Json
  $headers = @{ Authorization = "Bearer $($json.token)" }
  Write-Output "$($profile.Name) LOGIN=OK role=$($json.user.role)"

  foreach ($route in $profile.Routes) {
    $response = Invoke-WebRequest -Uri "$baseUrl$route" -UseBasicParsing -TimeoutSec 30 -Headers $headers
    Write-Output "$($profile.Name) $route STATUS=$([int]$response.StatusCode) LEN=$($response.Content.Length)"
  }
}
