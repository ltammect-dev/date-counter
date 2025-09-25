@echo off
echo Starting MongoDB Countdown Timer App...

echo.
echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

timeout /t 3 >nul

echo [2/2] Starting Frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul