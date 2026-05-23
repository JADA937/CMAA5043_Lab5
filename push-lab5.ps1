# Push full local project to GitHub (same tree as your zip, minus node_modules/dist).
# Repo: https://github.com/JADA937/CMAA5043_Lab5
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Refresh PATH so Git is found after a fresh install
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

function Find-Git {
    $cmd = Get-Command git -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    foreach ($p in @(
        "$env:ProgramFiles\Git\cmd\git.exe",
        "${env:ProgramFiles(x86)}\Git\cmd\git.exe",
        "$env:LocalAppData\Programs\Git\cmd\git.exe"
    )) {
        if (Test-Path $p) { return $p }
    }
    return $null
}

$git = Find-Git
if (-not $git) {
    Write-Host "Git was not found. Install Git for Windows, then re-run this script." -ForegroundColor Red
    exit 1
}

$origin = "https://github.com/JADA937/CMAA5043_Lab5.git"

if (-not (Test-Path ".git")) {
    & $git init
    & $git branch -M main
}

$remoteUrl = & $git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    & $git remote set-url origin $origin
} else {
    & $git remote add origin $origin
}

& $git add -A
& $git status
& $git diff --staged --quiet
if ($LASTEXITCODE -ne 0) {
    & $git commit -m "Add full CMAA5043 Lab 5 project (Vite, React, tutorials, tank game)"
}

Write-Host "Pushing to origin main..." -ForegroundColor Cyan
& $git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Push failed. Common fix if the remote only had a README:" -ForegroundColor Yellow
    Write-Host "  git pull origin main --allow-unrelated-histories --no-edit" -ForegroundColor Gray
    Write-Host "  git push -u origin main" -ForegroundColor Gray
    Write-Host "Or replace remote history (use only if you intend to overwrite the repo):" -ForegroundColor Yellow
    Write-Host "  git push -u origin main --force-with-lease" -ForegroundColor Gray
    exit $LASTEXITCODE
}

Write-Host "Done." -ForegroundColor Green
