# API Documentation + Postman Notes

Base URL: `http://localhost:5000/api`

## Auth

### Register
- **POST** `/auth/register`
- Body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "123456"
}
```
- Success: `201`

### Login
- **POST** `/auth/login`
- Body:
```json
{
  "email": "alice@example.com",
  "password": "123456"
}
```
- Success: `200`

### Profile
- **GET** `/auth/profile`
- Header: `Authorization: Bearer <token>`
- Success: `200`

## Tasks

> All task routes require Authorization header.

### Create task
- **POST** `/tasks`
```json
{
  "title": "Task title",
  "description": "Optional description",
  "status": "pending",
  "dueDate": "2026-12-31"
}
```

### Get tasks
- **GET** `/tasks`
- Query params (optional):
  - `search` (text match by title)
  - `status` (`pending`, `in-progress`, `completed`)

### Update task
- **PUT** `/tasks/:id`
```json
{
  "title": "Updated title",
  "status": "completed"
}
```

### Delete task
- **DELETE** `/tasks/:id`

## Postman collection tips

1. Create environment variable `baseUrl = http://localhost:5000/api`
2. Create variable `token`.
3. After login/register, copy `token` from response and save it.
4. For protected routes set Authorization tab:
   - Type: Bearer Token
   - Token: `{{token}}`
