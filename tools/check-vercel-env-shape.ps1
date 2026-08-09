$Path = Join-Path (Split-Path -Parent $PSScriptRoot) ".env.vercel-import"
if (-not (Test-Path -LiteralPath $Path)) {
  throw "Arquivo nao encontrado: $Path"
}

$RequiredKeys = @(
  "DATABASE_URL",
  "DIRECT_URL",
  "BLOB_READ_WRITE_TOKEN",
  "COURSE_STORAGE_MODE",
  "MERCADO_PAGO_ACCESS_TOKEN",
  "FORTIXSEG_ADMIN_EMAIL",
  "FORTIXSEG_ADMIN_PASSWORD",
  "FORTIXSEG_SESSION_SECRET",
  "PUBLIC_BASE_URL"
)

$Lines = Get-Content -LiteralPath $Path
foreach ($Key in $RequiredKeys) {
  $Line = $Lines | Where-Object { $_ -match ("^\s*" + [regex]::Escape($Key) + "\s*=") } | Select-Object -First 1
  if (-not $Line) {
    Write-Output "${Key}: AUSENTE"
    continue
  }
  $Value = $Line.Substring($Line.IndexOf("=") + 1).Trim()
  if ([string]::IsNullOrWhiteSpace($Value)) {
    Write-Output "${Key}: VAZIA"
  } else {
    Write-Output "${Key}: OK len=$($Value.Length)"
  }
}
