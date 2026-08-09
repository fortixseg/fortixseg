param(
  [string]$BaseUrl = "https://fortixseg-plataforma.vercel.app"
)

$sourcePath = Join-Path $PSScriptRoot "..\.env"
$outputPath = Join-Path $PSScriptRoot "..\.env.vercel-teste"

if (!(Test-Path $sourcePath)) {
  throw "Arquivo .env local nao encontrado."
}

$exclude = @(
  "PORT",
  "DATABASE_URL",
  "DIRECT_URL",
  "OPENAI_API_KEY",
  "OPENAI_MODEL"
)

$result = New-Object System.Collections.Generic.List[string]

foreach ($line in Get-Content $sourcePath) {
  $trimmed = $line.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) {
    continue
  }

  $parts = $trimmed.Split("=", 2)
  $key = $parts[0].Trim()
  $value = if ($parts.Count -gt 1) { $parts[1] } else { "" }

  if ($exclude -contains $key) {
    continue
  }

  if ($key -eq "PUBLIC_BASE_URL") {
    $result.Add("PUBLIC_BASE_URL=$BaseUrl")
    continue
  }

  $result.Add("$key=$value")
}

Set-Content -Path $outputPath -Value $result -Encoding UTF8

Write-Output "Arquivo gerado: $outputPath"
Write-Output ""
Write-Output "Resumo sem mostrar valores:"
foreach ($line in Get-Content $outputPath) {
  if ($line -match "^\s*([^#=]+)=") {
    $name = $matches[1].Trim()
    $value = $line -replace "^[^=]*=", ""
    $status = if ([string]::IsNullOrWhiteSpace($value)) { "VAZIA" } else { "PREENCHIDA" }
    Write-Output "$name=$status"
  }
}
