
#!/bin/bash

# --- Configuration ---
IMAGE_NAME="clb-api-tool"
CONTAINER_NAME="clb-api-container"
DEFAULT_PORT=8080

# --- Script Logic ---

# Use the first argument as the port, or the default port if not provided.
HOST_PORT=${1:-$DEFAULT_PORT}

echo "Stopping and removing existing container named $CONTAINER_NAME..."
docker stop $CONTAINER_NAME >/dev/null 2>&1 || true
docker rm $CONTAINER_NAME >/dev/null 2>&1 || true

echo "\nBuilding Docker image: $IMAGE_NAME..."
docker build -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo "\n[ERROR] Docker image build failed. Aborting."
    exit 1
fi

echo "\nStarting new container: $CONTAINER_NAME"
echo "Mapping host port $HOST_PORT to container port 3001"
docker run -d --name $CONTAINER_NAME -p ${HOST_PORT}:3001 $IMAGE_NAME

if [ $? -eq 0 ]; then
    echo "\n[SUCCESS] Container is running."
    echo "Access the application at: http://localhost:${HOST_PORT}"
else
    echo "\n[ERROR] Failed to start the container."
fi

