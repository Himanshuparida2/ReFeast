#!/bin/bash
# This script runs before your application files are installed

echo "Running BeforeInstall step"

# Update system packages
sudo apt-get update -y

# Install Node.js if not installed
if ! command -v node &> /dev/null
then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
