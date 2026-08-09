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

$argsList = @(
  "exec",
  "--yes",
  "vercel@latest",
  "--",
  "deploy",
  "--prod",
  "--force",
  "--yes",
  "--scope",
  $Scope,
  "--project",
  $Project
)

foreach ($line in Get-Content $envPath) {
  $trimmed = $line.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) {
    continue
  }

  $parts = $trimmed.Split("=", 2)
  $key = $parts[0].Trim()
  $value = if ($parts.Count -gt 1) { $parts[1] } else { "" }
  if ([string]::IsNullOrWhiteSpace($value)) {
    continue
  }

  $argsList += "--env"
  $argsList += "$key=$value"
}

Push-Location $projectRoot
try {
  Write-Output "Conferindo codigo..."
  npm.cmd run check
  if ($LASTEXITCODE -ne 0) { throw "Falha na checagem do codigo." }

  Write-Output "Fazendo deploy com variaveis de runtime..."
  & npm.cmd @argsList
  if ($LASTEXITCODE -ne 0) { throw "Falha no deploy." }
} finally {
  Pop-Location
}
