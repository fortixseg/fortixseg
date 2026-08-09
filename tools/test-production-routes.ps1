$ErrorActionPreference = "Continue"

$baseUrl = "https://fortixseg-plataforma.vercel.app"
$routes = @(
  "/",
  "/api/health",
  "/api/courses",
  "/api/student/dashboard",
  "/api/company/dashboard",
  "/api/admin/dashboard",
  "/api/admin/interactive-courses"
)

foreach ($route in $routes) {
  try {
    $response = Invoke-WebRequest -Uri "$baseUrl$route" -UseBasicParsing -TimeoutSec 30
    Write-Output "$route STATUS=$([int]$response.StatusCode) LEN=$($response.Content.Length)"
  } catch {
    $status = ""
    if ($_.Exception.Response) {
      $status = " STATUS=$([int]$_.Exception.Response.StatusCode)"
    }
    Write-Output "$route ERROR$status MSG=$($_.Exception.Message)"
    try {
      if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        if ($body) { Write-Output "BODY=$body" }
      }
    } catch {}
  }
}
