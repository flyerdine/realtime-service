# Event service built with ExpressJS

Event dispatcher service built on NodeJS.

## Tech Stack

- Node.js 16
- NPM Libraries
  - Nodemon for Debugging and keeping track of changed files
  - Express for initiating the server
  - BodyParser to parse request body

## Walkthrough

### Set-up Docker (Recommended)

```
docker compose -f "docker-compose.yml" up -d --build
```

### Starting the API Server

```
nodemon app.js

OR

npm run start
```



### Create a pub post

```
curl -X POST \
  http://localhost:3000/orders \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: *' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -d '{
	"order_id" : 1,
    ...
}'
```

### Create a sub post

```
curl -X GET \
  http://localhost:3000/orders \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: *' \
  -H 'Content-Type: application/json'

```
