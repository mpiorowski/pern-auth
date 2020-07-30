# pern-auth
PERN stack app with authorization using JWT tokens

## Dependencies
npm, docker, docker-compose

## Dev deployment
- start database using docker-compose
```
sh db-start.sh
```
- copy config file and make neccessary changes. Database connection is already set. Email is needed for new accounts.
```
cp server/src/config/app-config.ts.dist server/src/config/app-config.ts
```

- run two terminals for server and client
```
cd server && npm i && npm start
```

```
cd client && npm i && npm start
```

- access using http://localhost:3000 with:

-- username: admin  
-- password: pass


