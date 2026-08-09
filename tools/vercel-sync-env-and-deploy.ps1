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

$removeKeys = @(
  "PUBLIC_BASE_URL",
  "FORTIXSEG_SESSION_SECRET",
  "FORTIXSEG_STUDENT_EMAIL",
  "FORTIXSEG_STUDENT_PASSWORD",
  "FORTIXSEG_COMPANY_EMAIL",
  "FORTIXSEG_COMPANY_PASSWORD",
  "FORTIXSEG_AFFILIATE_EMAIL",
  "FORTIXSEG_AFFILIATE_PASSWORD",
  "FORTIXSEG_ADMIN_EMAIL",
  "FORTIXSEG_ADMIN_PASSWORD",
  "FORTIXSEG_ADMIN_REGISTRATION_CODE",
  "DATABASE_URL",
  "DIRECT_URL",
  "MERCADO_PAGO_USE_SANDBOX",
  "MERCADO_PAGO_ACCESS_TOKEN",
  "MERCADO_PAGO_WEBHOOK_SECRET",
  "COURSE_STORAGE_MODE",
  "BLOB_READ_WRITE_TOKEN",
  "OPENAI_API_KEY",
  "OPENAI_MODEL"
)

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
    Write-Output "Ignorando variavel vazia: $key"
    continue
  }

  $vars += [pscustomobject]@{ Key = $key; Value = $value }
}

Push-Location $projectRoot
try {
  Write-Output "1/5 Conferindo codigo..."
  npm.cmd run check
  if ($LASTEXITCODE -ne 0) { throw "Falha na checagem do codigo." }

  Write-Output "2/5 Vinculando pasta ao projeto Vercel..."
  npm.cmd exec --yes vercel@latest -- link --yes --project $Project --scope $Scope
  if ($LASTEXITCODE -ne 0) { throw "Falha ao vincular projeto Vercel." }

  Write-Output "3/5 Limpando variaveis antigas/problematicas..."
  foreach ($key in $removeKeys) {
    npm.cmd exec --yes vercel@latest -- env rm $key production --yes --scope $Scope | Out-Null
    npm.cmd exec --yes vercel@latest -- env rm $key preview --yes --scope $Scope | Out-Null
  }

  Write-Output "4/5 Recriando variaveis preenchidas..."
  foreach ($item in $vars) {
    Write-Output "Adicionando $($item.Key)..."
    npm.cmd exec --yes vercel@latest -- env add $item.Key production --value $item.Value --yes --scope $Scope
    if ($LASTEXITCODE -ne 0) { throw "Falha ao adicionar $($item.Key) em production." }

    npm.cmd exec --yes vercel@latest -- env add $item.Key preview --value $item.Value --yes --scope $Scope
    if ($LASTEXITCODE -ne 0) { throw "Falha ao adicionar $($item.Key) em preview." }
  }

  Write-Output "Variaveis atuais:"
  npm.cmd exec --yes vercel@latest -- env ls --scope $Scope

  Write-Output "5/5 Fazendo deploy de producao..."
  npm.cmd exec --yes vercel@latest -- deploy --prod --scope $Scope --yes
  if ($LASTEXITCODE -ne 0) { throw "Falha no deploy de producao." }

  Write-Output "Pronto. Aguarde 1 minuto e teste: https://fortixseg-plataforma.vercel.app"
} finally {
  Pop-Location
}
