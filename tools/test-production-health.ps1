$url = "https://fortixseg-plataforma.vercel.app/api/health"

try {
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
  Write-Output "STATUS=$([int]$response.StatusCode)"
  Write-Output $response.Content
} catch {
  Write-Output "ERROR=$($_.Exception.Message)"
  if ($_.Exception.Response) {
    Write-Output "STATUS=$([int]$_.Exception.Response.StatusCode)"
  }
}
