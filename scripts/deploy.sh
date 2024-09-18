#! /bin/sh

set -e

cd /home/app

# Check if docker-compose is up and bring it down
if docker-compose ps | grep "Up"; then
    echo "docker-compose is running, bringing it down..."
    docker-compose down
else
    echo "docker-compose is not running."
fi

# Step 3: Remove any existing images on the system
echo "Removing all Docker images..."
docker rmi -f $(docker images -q)

# Step 4: Run docker-compose up in detached mode
echo "Bringing up docker-compose in detached mode..."
docker-compose up -d

echo "Script execution completed!"