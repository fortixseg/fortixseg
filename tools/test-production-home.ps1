try {
  $response = Invoke-WebRequest -Uri "https://fortixseg-plataforma.vercel.app" -UseBasicParsing -TimeoutSec 30
  Write-Output "HOME_STATUS=$([int]$response.StatusCode)"
  if ($response.Content -match "FortixSeg") {
    Write-Output "HOME_CONTEUDO=OK"
  } else {
    Write-Output "HOME_CONTEUDO=NAO_ENCONTROU_MARCA"
  }
} catch {
  Write-Output "HOME_ERRO=$($_.Exception.Message)"
  if ($_.Exception.Response) { Write-Output "HOME_STATUS=$([int]$_.Exception.Response.StatusCode)" }
}
