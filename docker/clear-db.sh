docker container stop $(docker container ls -aq)
sudo rm -rf ./pgdata
docker-compose -f docker-compose.db.yml up -d --build
