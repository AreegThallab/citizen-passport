@echo off
cd /d "%~dp0"
if not exist .venv\Scripts\python.exe py -m venv .venv
if errorlevel 1 goto fail
.venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 goto fail
.venv\Scripts\python.exe manage.py migrate
if errorlevel 1 goto fail
echo Open http://127.0.0.1:8000 in your browser
.venv\Scripts\python.exe manage.py runserver
pause
exit /b
:fail
echo Setup failed. Check Python 3.10+ installation and internet connection.
pause
