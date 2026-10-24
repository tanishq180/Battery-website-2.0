@echo off
echo ========================================================
echo  Setting up Import/Export Business Web Application...
echo ========================================================

echo.
echo [1/4] Setting up Backend...
cd backend
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)
echo Installing Backend dependencies...
call .\venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt

if not exist .env (
    echo Creating backend .env file...
    copy .env.example .env
)

echo Initializing database and admin user...
python scripts\seed_admin.py
cd ..

echo.
echo [2/4] Setting up Frontend...
cd frontend
if not exist .env.local (
    echo Creating frontend .env.local file...
    copy .env.local.example .env.local
)

echo Installing Node dependencies...
call npm install
cd ..

echo.
echo ========================================================
echo  Setup Completed Successfully!
echo  To run the full stack, run: start.bat or start.ps1
echo ========================================================
pause
