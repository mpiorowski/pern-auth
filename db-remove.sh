#!/bin/sh
docker stop $(docker ps -a -q)
sudo rm -rf ./docker/pgdata
