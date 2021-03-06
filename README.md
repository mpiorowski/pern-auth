# PostgreSQL, Express, React and Node.js app written in Typescript
PERN stack app with authorization using JWT tokens

- Fully working login solution using tokens
- New user registry via email with secuirty code
- Reset password via email with security code

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

## Prod deployment
Whole production deployment is done using docker.
- copy config file and make neccessary changes to database and email credentials.
```
cp server/src/config/app-config.ts.dist server/src/config/app-config.ts
```
- run docker-compose
```
cd docker
sh prod.sh
```


