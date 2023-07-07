<h1 align="center">Book Management App</h1>

## About

<br>

This is a backend application that manages books and their creators. It provides APIs for creating books, viewing books, and filtering books based on creation time. The application is built using Node.js and TypeScript with the Express framework and MongoDB for data storage.
<br>

## Installation

```
npm install
```

## Start the Backend server 

```
npm run start

npm run server

node index.js

nodemon start

nodemon index.js
```

Note : You can use any of them 

<br>

##  MVC Structure

```
├── logs
|    └── api.log
├── src
     ├── config
     |    └── db.ts
     ├── models
     |    └── book.model.ts
     |    └── user.model.ts
     ├── routes
     |    └── book.model.ts
     |    └── auth.model.ts
     ├── middleware
     |    └── authentication.middleware.ts
     ├──controllers
     |    └── auth.controller.ts
     |    └── book.controller.ts
     └── index.ts
```
Note: 

- Before doing anything first create `.env` file and put `PORT` , `MONGO_URL`.
- `PORT` is for listening the server.
- `MONGO_URL` is for running database and store your data in database so put your mongo link.

<br>

## Schema Design

<br>

<h3><strong>User Schema</strong><h3>

```js
{
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true, min: 10 },
    role: { type: String, enum: ["CREATOR", "VIEWER", "VIEW_ALL"], required: true }
}, {
    timestamps: true,
    versionKey: false
}
```

<h3><strong>Book Schema</strong><h3>

```js
{
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }, {
    timestamps: true,
    versionKey: false
}
```

## Endpoints

<table>
    <thead>
        <tr>
            <th>METHOD</th>
            <th>ENDPOINT</th>
            <th>DESCRIPTION</th>
            <th>STATUS CODE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/signup</td>
            <td>This endpoint should allow users to register. Hash the password on store.</td>
            <td>201</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/login</td>
            <td>This endpoint should allow users to login. Return JWT token on login.</td>
            <td>201</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/books</td>
            <td>This endpoint is used to create new book with role of CREATOR</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/books</td>
            <td>This endpoint is used view book with role of VIEWER</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/books/all</td>
            <td>This endpoint is used view book with role of VIEW_ALL</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/books/filter?`old/new=1`</td>
            <td>This endpoint is for view books with filtering according to time</td>
            <td>200</td>
        </tr> 
    </tbody>
</table>