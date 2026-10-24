@echo off
echo ========================================================
echo  Starting Import/Export Business Web Application...
echo ========================================================
echo.
echo Starting FastAPI Backend at http://127.0.0.1:8000 ...
start "FastAPI Backend" cmd /k "cd /d %~dp0backend && call .\venv\Scripts\activate.bat && uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo Starting Next.js Frontend at http://localhost:3000 ...
start "Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================================
echo  Services launched in separate windows!
echo  - Frontend: http://localhost:3000
echo  - Backend API: http://127.0.0.1:8000
echo  - API Docs: http://127.0.0.1:8000/docs
echo  - Admin Portal: http://localhost:3000/admin/login
echo ========================================================
