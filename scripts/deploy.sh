#! /bin/sh

set -e

# clear any existing docker images

# copy the docker compose file to server
# copy the nginx-configuration to server

# run docker compose up

# stop any existing docker compose
docker-compose stop

# remove the existing containers
docker-compose rm -f

# pull the latest containers
docker-compose pull

# start the containers
docker-compose up -d