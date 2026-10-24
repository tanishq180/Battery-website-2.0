# Launch both Backend & Frontend services in PowerShell

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Starting Import/Export Business Web Application... " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$backendDir = Join-Path $PSScriptRoot "backend"
$frontendDir = Join-Path $PSScriptRoot "frontend"

Write-Host "`n[1/2] Launching FastAPI Backend (http://127.0.0.1:8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$backendDir'; .\venv\Scripts\Activate.ps1; uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

Write-Host "[2/2] Launching Next.js Frontend (http://localhost:3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$frontendDir'; npm run dev"

Write-Host "`n✓ Both services launched in separate windows!" -ForegroundColor Green
Write-Host "--------------------------------------------------------" -ForegroundColor White
Write-Host " Frontend:      http://localhost:3000" -ForegroundColor Cyan
Write-Host " Admin Portal:  http://localhost:3000/admin/login" -ForegroundColor Cyan
Write-Host " Backend API:   http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host " Swagger Docs:  http://127.0.0.1:8000/docs" -ForegroundColor Cyan
Write-Host " Admin Login:   admin@company.com / AdminPassword123!" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Green
