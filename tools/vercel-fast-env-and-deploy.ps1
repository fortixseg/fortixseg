param(
  [string]$Scope = "fortix",
  [string]$Project = "fortixseg-plataforma",
  [string]$EnvFile = ".env.vercel-teste"
)

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$envPath = Join-Path $projectRoot $EnvFile

if (!(Test-Path $envPath)) {
  throw "Arquivo nao encontrado: $envPath"
}

$vars = @()
foreach ($line in Get-Content $envPath) {
  $trimmed = $line.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) {
    continue
  }

  $parts = $trimmed.Split("=", 2)
  $key = $parts[0].Trim()
  $value = if ($parts.Count -gt 1) { $parts[1] } else { "" }

  if ([string]::IsNullOrWhiteSpace($value)) {
    Write-Output "Ignorando vazia: $key"
    continue
  }

  $vars += [pscustomobject]@{ Key = $key; Value = $value }
}

$keysToClear = @(
  ($vars | ForEach-Object { $_.Key }),
  "DATABASE_URL",
  "DIRECT_URL",
  "COURSE_STORAGE_MODE",
  "BLOB_READ_WRITE_TOKEN",
  "OPENAI_API_KEY",
  "OPENAI_MODEL"
) | Select-Object -Unique

Push-Location $projectRoot
try {
  Write-Output "1/4 Conferindo codigo..."
  npm.cmd run check
  if ($LASTEXITCODE -ne 0) { throw "Falha na checagem do codigo." }

  Write-Output "2/4 Vinculando projeto Vercel..."
  npm.cmd exec --yes vercel@latest -- link --yes --project $Project --scope $Scope
  if ($LASTEXITCODE -ne 0) { throw "Falha ao vincular projeto Vercel." }

  Write-Output "3/4 Atualizando variaveis..."
  foreach ($key in $keysToClear) {
    Write-Output "Limpando $key..."
    npm.cmd exec --yes vercel@latest -- env rm $key --yes --scope $Scope 2>$null | Out-Null
  }

  foreach ($item in $vars) {
    Write-Output "Adicionando $($item.Key)..."
    npm.cmd exec --yes vercel@latest -- env add $item.Key production --value $item.Value --yes --scope $Scope
    if ($LASTEXITCODE -ne 0) { throw "Falha ao adicionar $($item.Key) em production." }

    npm.cmd exec --yes vercel@latest -- env add $item.Key preview --value $item.Value --yes --scope $Scope
    if ($LASTEXITCODE -ne 0) { throw "Falha ao adicionar $($item.Key) em preview." }
  }

  Write-Output "4/4 Deploy em producao..."
  npm.cmd exec --yes vercel@latest -- deploy --prod --scope $Scope --yes
  if ($LASTEXITCODE -ne 0) { throw "Falha no deploy de producao." }

  Write-Output "Pronto: https://fortixseg-plataforma.vercel.app"
} finally {
  Pop-Location
}
