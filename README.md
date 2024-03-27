
## Description

This is written in Nest.js and MongoDB.

Small instructions to run this.

## Installation

```bash
1. $ npm install

2. Create a .env file based on the example .env.example

MONGO_URI=
JWT_SECRET=HI
HASH_SECRET=BYE

```

## Running the app

```bash
1. # watch mode
$ npm run start:dev

2. Make test data hitting the 3 urls

http://localhost:8000/api/course/testData

http://localhost:8000/api/user/student/testData

http://localhost:8000/api/auth/testData

```


## Testing the data

```bash

1. Sign up as admin first

http://localhost:8000/auth/signup

{
  "email": "new22@example.com",
  "password": "123456",
  "roles": ["admin"]
}

2. Login as admin and save accesss token in bearer, not authorization header

http://localhost:8000/auth/login

{
  "email": "new22@example.com",
  "password": "123456"
}

2.1. Course List with pagination based official mongoose-paginate-v2 library and datewise filtration

Must have bearer token

Paginate using: 1. Limit and 2. skip

Filter using startDate and endDate and MongoDB operators: e.g. $gte, $lt, etc.

http://localhost:8000/api/course?page=1&startDate[gte]=2023-04-01

http://localhost:8000/api/course?limit=20&startDate[gte]=2023-04-01

http://localhost:8000/api/course?page=1&endDate[lte]=2023-04-01


2.2. Course List CRUD 

Must have bearer token

GET, PUT, DELETE
http://localhost:8000/api/course/{id}

CREATE
http://localhost:8000/api/course/

```


```bash
3. Student List

Must have bearer token

http://localhost:8000/api/user/student/


http://localhost:8000/api/user/{id}

```

