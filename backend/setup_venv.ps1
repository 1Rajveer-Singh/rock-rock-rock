# LiDAR Rockfall Prediction - Virtual Environment Setup
# Run this script in PowerShell

Write-Host "Setting up LiDAR Analysis Virtual Environment..." -ForegroundColor Green

# Navigate to project directory
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDir

# Create virtual environment
Write-Host "Creating virtual environment..." -ForegroundColor Yellow
python -m venv lidar_env

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& ".\lidar_env\Scripts\Activate.ps1"

# Upgrade pip
Write-Host "Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Install requirements
Write-Host "Installing requirements..." -ForegroundColor Yellow
if (Test-Path "outputs\requirements.txt") {
    pip install -r outputs\requirements.txt
} else {
    Write-Host "requirements.txt not found. Run the notebook first to generate it." -ForegroundColor Red
}

# Install Jupyter
Write-Host "Installing Jupyter..." -ForegroundColor Yellow
pip install jupyter jupyterlab ipykernel

# Add kernel to Jupyter
Write-Host "Adding kernel to Jupyter..." -ForegroundColor Yellow
python -m ipykernel install --user --name=lidar_env --display-name="LiDAR Analysis"

Write-Host "Setup complete! Virtual environment 'lidar_env' is ready." -ForegroundColor Green
Write-Host "To activate manually: .\lidar_env\Scripts\Activate.ps1" -ForegroundColor Cyan
Write-Host "To deactivate: deactivate" -ForegroundColor Cyan
