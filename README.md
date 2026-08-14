# learning-platform-api

A RESTful API for a learning platform, built with **Node.js** and **Express**, using **MongoDB** as the database.

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) — web framework
- [MongoDB](https://www.mongodb.com/) — NoSQL database (via the official `mongodb` driver)
- [express-validator](https://express-validator.github.io/) — request validation
- [morgan](https://github.com/expressjs/morgan) — HTTP request logging
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — password hashing
- [dotenv](https://github.com/motdotla/dotenv) — environment variables

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- MongoDB running locally or a remote MongoDB connection string

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd learning-platform-api

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root (see `.env.example` for reference):

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017
DATABASE_NAME=learning_platform
```

| Variable        | Description                                 | Default                    |
| --------------- | ------------------------------------------- | -------------------------- |
| `PORT`          | Port the server listens on                  | `3000`                     |
| `DATABASE_URL`  | MongoDB connection string                   | `mongodb://localhost:27017` |
| `DATABASE_NAME` | Name of the database to use                 | `learning_platform`         |

### Running the Server

```bash
npm start
```

The server will connect to MongoDB and start listening. By default it runs at `http://localhost:3000`.

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Users

| Method   | Endpoint         | Description                          |
| -------- | ---------------- | ------------------------------------ |
| `POST`   | `/users/register` | Register a new user (hashes password) |
| `POST`   | `/users/login`    | Login with email and password         |
| `GET`    | `/users`          | Get all users                        |
| `GET`    | `/users/:id`      | Get a single user by ID              |
| `POST`   | `/users`          | Create a new user                    |
| `PATCH`  | `/users/:id`      | Update an existing user              |
| `DELETE` | `/users/:id`      | Delete a user by ID                  |

The `/:id` route must come after the literal `/register` and `/login` routes, so the word `register`/`login` is never treated as an ID.

### Courses

| Method   | Endpoint             | Description                 |
| -------- | -------------------- | --------------------------- |
| `GET`    | `/courses`           | Get all courses             |
| `GET`    | `/courses/:id`       | Get a single course by ID   |
| `POST`   | `/courses`           | Create a new course         |
| `PATCH`  | `/courses/:id`       | Update an existing course   |
| `DELETE` | `/courses/:id`       | Delete a course by ID       |

### User Authentication

Passwords are hashed with **bcrypt** (cost factor 12); the plaintext password is never stored or returned.

#### Register

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phonNumber": "123456789",
    "password": "secret123"
  }'
```

Returns `201` with the created user (without the password hash). Returns `409` if the email is already registered.

#### Login

```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "secret123"
  }'
```

Returns `200` with the user (without the password hash), or `401` on invalid credentials.

### Course Object

| Field        | Type     | Description                          |
| ------------ | -------- | ------------------------------------ |
| `title`      | string   | Course title (required)              |
| `instructor` | string   | Instructor name (required)           |
| `category`   | string   | Course category                      |
| `price`      | number   | Price, must be `>= 0`                |
| `rating`     | number   | Rating between `0` and `5`           |
| `duration`   | string   | Course duration                      |
| `level`      | string   | Difficulty level                     |
| `students`   | integer  | Enrolled students, must be `>= 0`    |

### Request Validation

All validation runs as middleware in `routes/courses.routes.js` **before** the controller is reached. Controllers contain business logic only.

| Endpoint         | Validators applied                                   |
| ---------------- | ---------------------------------------------------- |
| `GET /courses`           | —                                        |
| `GET /courses/:id`       | `idValidator` — `:id` must be a valid Mongo ObjectId |
| `POST /courses`          | `createCourseValidator` — validates the request body |
| `PATCH /courses/:id`     | `idValidator` + `createCourseValidator`              |
| `DELETE /courses/:id`    | `idValidator` — `:id` must be a valid Mongo ObjectId |

Invalid requests are rejected with HTTP `400` before reaching the controller.

### Example: Create a Course

```bash
curl -X POST http://localhost:3000/api/v1/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to JavaScript",
    "instructor": "Jane Doe",
    "category": "Programming",
    "price": 49.99,
    "rating": 4.5,
    "duration": "6 weeks",
    "level": "Beginner",
    "students": 1200
  }'
```

### Response Format

Successful requests return:

```json
{
  "message": "success",
  "data": {
    "course": { ... }
  }
}
```

Validation errors return HTTP `400` with a list of errors:

```json
{
  "status": "failed",
  "errors": [
    { "msg": "Title is required", "path": "title", ... }
  ]
}
```

## Project Structure

```
learning-platform-api/
├── app.js                  # App entry point
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── courses.controller.js  # Request handlers for courses
│   └── users.controller.js    # Request handlers for users (incl. register/login)
├── middlewares/
│   └── validate.js         # Validation-result middleware (returns 400 on errors)
├── routes/
│   ├── courses.routes.js   # Course routes + validator middleware wiring
│   └── users.routes.js     # User routes (register, login, CRUD)
├── validator/
│   └── courses.validator.js # express-validator rules (id + create/update body)
├── .env.example            # Environment variables template
└── package.json
```

## Roadmap

- [x] User routes and authentication
- [ ] User validation (express-validator rules for register/login)
- [ ] Models layer
- [ ] Tests
- [ ] API documentation (Swagger/OpenAPI)
