# Automated Setup Script for Import/Export Business Web Application
# Powershell Execution

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Setting up Import/Export Business Web Application... " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Check Python
Write-Host "`n[1/5] Checking Python installation..." -ForegroundColor Yellow
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pyVersion = python --version
    Write-Host "  ✓ Found: $pyVersion" -ForegroundColor Green
} else {
    Write-Error "Python is not found in PATH. Please install Python 3.10+ and re-run setup."
    exit 1
}

# 2. Check Node & npm
Write-Host "`n[2/5] Checking Node.js & npm..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node -v
    Write-Host "  ✓ Found Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Error "Node.js is not found in PATH. Please install Node.js 18+ and re-run setup."
    exit 1
}

# 3. Setup Backend Virtual Environment & Dependencies
Write-Host "`n[3/5] Setting up Backend Virtual Environment & Dependencies..." -ForegroundColor Yellow
Set-Location backend

if (-not (Test-Path "venv")) {
    Write-Host "  Creating virtual environment in backend/venv..." -ForegroundColor Gray
    python -m venv venv
}

Write-Host "  Upgrading pip & installing Python requirements..." -ForegroundColor Gray
.\venv\Scripts\python -m pip install --upgrade pip
.\venv\Scripts\pip install -r requirements.txt

# Ensure backend .env exists
if (-not (Test-Path ".env")) {
    Write-Host "  Creating backend/.env from .env.example..." -ForegroundColor Gray
    Copy-Item ".env.example" ".env"
}

# Verify database and seed admin
Write-Host "  Initializing Database & Seeding default admin user..." -ForegroundColor Gray
.\venv\Scripts\python scripts/seed_admin.py

Set-Location ..

# 4. Setup Frontend Dependencies
Write-Host "`n[4/5] Setting up Frontend Dependencies..." -ForegroundColor Yellow
Set-Location frontend

# Ensure frontend .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "  Creating frontend/.env.local from .env.local.example..." -ForegroundColor Gray
    Copy-Item ".env.local.example" ".env.local"
}

Write-Host "  Installing npm packages..." -ForegroundColor Gray
npm install

Set-Location ..

# 5. Done
Write-Host "`n[5/5] Setup Complete!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host " You can now start the application by running: " -ForegroundColor White
Write-Host "   .\start.ps1" -ForegroundColor Yellow
Write-Host " or:" -ForegroundColor White
Write-Host "   .\start.bat" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Green
