$Project = Split-Path -Parent $PSScriptRoot
$Source = Join-Path $Project ".env"
$Target = Join-Path $Project ".env.vercel-import"

if (-not (Test-Path -LiteralPath $Source)) {
  throw "Arquivo .env nao encontrado em $Source"
}

$Lines = Get-Content -LiteralPath $Source | Where-Object {
  $_ -notmatch "^\s*PORT\s*=" -and
  $_ -notmatch "^\s*OPENAI_API_KEY\s*=" -and
  $_ -notmatch "^\s*OPENAI_MODEL\s*="
}

$Output = New-Object System.Collections.Generic.List[string]
$HasPublicBaseUrl = $false

foreach ($Line in $Lines) {
  if ($Line -match "^\s*PUBLIC_BASE_URL\s*=") {
    $Output.Add("PUBLIC_BASE_URL=https://fortixseg-plataforma.vercel.app")
    $HasPublicBaseUrl = $true
  } else {
    $Output.Add($Line)
  }
}

if (-not $HasPublicBaseUrl) {
  $Output.Insert(0, "PUBLIC_BASE_URL=https://fortixseg-plataforma.vercel.app")
}

Set-Content -LiteralPath $Target -Value $Output -Encoding UTF8

$Count = ($Output | Where-Object { $_ -match "^\s*[A-Za-z0-9_]+\s*=" }).Count
Write-Output "Arquivo de importacao criado: $Target"
Write-Output "Variaveis preparadas: $Count"
