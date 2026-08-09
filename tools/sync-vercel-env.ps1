param(
  [string]$Scope = "fortix",
  [string]$EnvFile = ".env.vercel-teste"
)

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$envPath = Join-Path $projectRoot $EnvFile

if (!(Test-Path $envPath)) {
  throw "Arquivo de variaveis nao encontrado: $envPath"
}

$keysToRemove = @(
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

Push-Location $projectRoot
try {
  foreach ($key in $keysToRemove) {
    foreach ($envName in @("production", "preview")) {
      Write-Output "Removendo $key de $envName se existir..."
      $null = npm.cmd exec --yes vercel@latest -- env rm $key $envName --yes --scope $Scope 2>$null
    }
  }

  foreach ($line in Get-Content $envPath) {
    $trimmed = $line.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) {
      continue
    }

    $parts = $trimmed.Split("=", 2)
    $key = $parts[0].Trim()
    $value = if ($parts.Count -gt 1) { $parts[1] } else { "" }

    if ([string]::IsNullOrWhiteSpace($value)) {
      Write-Output "Pulando $key porque esta vazia."
      continue
    }

    Write-Output "Adicionando $key em production e preview..."
    npm.cmd exec --yes vercel@latest -- env add $key production preview --value $value --yes --scope $Scope
  }

  Write-Output ""
  Write-Output "Lista final na Vercel:"
  npm.cmd exec --yes vercel@latest -- env ls --scope $Scope
} finally {
  Pop-Location
}
