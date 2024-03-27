
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


3. Testing the links:

1. Sign up as admin first

http://localhost:8000/auth/signup

{
  "email": "new22@example.com",
  "password": "123456",
  "roles": ["admin"]
}

2. Login as admin

http://localhost:8000/auth/login

{
  "email": "new22@example.com",
  "password": "123456"
}

```

