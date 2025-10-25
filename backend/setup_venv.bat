@echo off
echo Setting up LiDAR Analysis Virtual Environment...

REM Navigate to project directory
cd /d "%~dp0"

REM Create virtual environment
echo Creating virtual environment...
python -m venv lidar_env

REM Activate virtual environment
echo Activating virtual environment...
call lidar_env\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install requirements
echo Installing requirements...
if exist "outputs\requirements.txt" (
    pip install -r outputs\requirements.txt
) else (
    echo requirements.txt not found. Run the notebook first to generate it.
)

REM Install Jupyter
echo Installing Jupyter...
pip install jupyter jupyterlab ipykernel

REM Add kernel to Jupyter
echo Adding kernel to Jupyter...
python -m ipykernel install --user --name=lidar_env --display-name="LiDAR Analysis"

echo Setup complete! Virtual environment 'lidar_env' is ready.
echo To activate manually: lidar_env\Scripts\activate.bat
echo To deactivate: deactivate

pause
