# Task Manager Dashboard (MERN + JWT)

A beginner-friendly full-stack project with:
- **Frontend:** React + Bootstrap + Axios
- **Backend:** Node.js + Express + MongoDB + JWT + bcrypt

---

## 🚀 Quickest way to run this project

If you already cloned this repo and want the fastest path:

```bash
# from project root
npm install
npm run install:all
cp backend/.env.example backend/.env
# edit backend/.env and set MONGO_URI + JWT_SECRET
npm run dev
```

Then open:
- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000`

> If you see `concurrently is not recognized`, pull latest code and run again. We removed that dependency and now use a built-in Node runner script.

---

## 1) Start from absolute zero (setup)

## Install tools first
1. **Node.js (LTS)**
   - Download: https://nodejs.org
   - Verify:
     ```bash
     node -v
     npm -v
     ```

2. **MongoDB**
   - Option A (local): install MongoDB Community Server.
   - Option B (cloud): use MongoDB Atlas and copy connection string.

3. **Postman**
   - Download: https://www.postman.com/downloads/

> Common error warning: if `node -v` fails, restart your terminal after installation.

---

## 2) Project structure

```text
backend/
  config/
    db.js
  controllers/
    authController.js
    taskController.js
  middleware/
    authMiddleware.js
  models/
    Task.js
    User.js
  routes/
    authRoutes.js
    taskRoutes.js
  .env.example
  package.json
  server.js

frontend/
  src/
    components/
      ProtectedRoute.jsx
      TaskForm.jsx
      TaskList.jsx
    context/
      AuthContext.jsx
    pages/
      DashboardPage.jsx
      LoginPage.jsx
      RegisterPage.jsx
    services/
      api.js
    App.jsx
    main.jsx
    styles.css
  index.html
  package.json
  vite.config.js
```

---

## 3) Backend setup

1. Go to backend and install packages:
   ```bash
   cd backend
   npm install
   ```

2. Create env file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` values:
   - `MONGO_URI`
   - `JWT_SECRET`

4. Run server:
   ```bash
   npm run dev
   ```

Server starts on `http://localhost:5000`.

> Common error warning: `MONGO_URI` wrong means database connection fails immediately.

---

## 4) API routes summary

### Auth routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (protected)

### Task routes (all protected)
- `POST /api/tasks`
- `GET /api/tasks?search=&status=`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

## 5) Postman testing guide

### Step A: Register
- Method: `POST`
- URL: `http://localhost:5000/api/auth/register`
- Body JSON:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "123456"
}
```
- Copy the `token` from response.

### Step B: Login
- Method: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Body JSON:
```json
{
  "email": "alice@example.com",
  "password": "123456"
}
```

### Step C: Use protected routes
- Add Header in Postman:
  - Key: `Authorization`
  - Value: `Bearer YOUR_TOKEN_HERE`

### Step D: Create task
- `POST http://localhost:5000/api/tasks`
```json
{
  "title": "Finish backend",
  "description": "Build task CRUD endpoints",
  "status": "pending"
}
```

### Step E: Read/search/filter tasks
- `GET http://localhost:5000/api/tasks`
- `GET http://localhost:5000/api/tasks?search=backend`
- `GET http://localhost:5000/api/tasks?status=completed`

### Step F: Update task
- `PUT http://localhost:5000/api/tasks/<TASK_ID>`
```json
{
  "status": "completed"
}
```

### Step G: Delete task
- `DELETE http://localhost:5000/api/tasks/<TASK_ID>`

---

### If you see `'nodemon' is not recognized` or `'concurrently' is not recognized`

This means dependencies/scripts were not available in your environment.

Use this exact flow from project root:

```bash
npm run install:all
cp backend/.env.example backend/.env
npm run dev
```

If you are on **Windows PowerShell**, run these in the same folder where `package.json` exists.

`backend` now uses Node's built-in watch mode, so nodemon is no longer required.

---

### If you see `ERR_CONNECTION_REFUSED` on register/login

This means your frontend is running but backend is not reachable.

1. Open a second terminal and run backend:
   ```bash
   npm run dev:backend
   ```
2. Check backend health in browser:
   - `http://localhost:5000/api/health`
3. If health route does not open:
   - make sure `backend/.env` exists
   - make sure `PORT=5000` is not used by another app
   - make sure MongoDB is running (or Atlas URI is correct)

> Tip: backend now retries MongoDB connection every 5 seconds instead of exiting immediately.

---

## 6) Frontend setup

1. Open new terminal:
   ```bash
   cd frontend
   npm install
   ```

2. Optional env file (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

---

## 7) How frontend auth works

- On login/register, backend sends JWT token.
- Frontend stores token in `localStorage`.
- Axios interceptor automatically adds token to headers.
- Protected route checks user profile before showing dashboard.
- Logout removes token and returns to login page.

---

## 8) Security checklist used

- Password hashing with `bcryptjs`
- JWT auth middleware (`Bearer token`)
- Input validation with `express-validator`
- Route protection for dashboard and task APIs
- Basic server-side error handling

---

## 9) Common beginner errors + fixes

1. **CORS error**
   - Ensure backend uses `app.use(cors())`.
2. **401 Invalid token**
   - Token expired or missing `Bearer` prefix.
3. **Validation failed**
   - Check min password length and required fields.
4. **Mongo connection failed**
   - Check `MONGO_URI` format and DB server status.

---

## 10) How this can scale in production

- Use refresh tokens + secure HTTP-only cookies.
- Add role-based authorization.
- Add pagination for large task lists.
- Use centralized logging (Winston + cloud logs).
- Use Redis caching for frequent reads.
- Use Docker + CI/CD pipeline.
- Add test coverage (unit + integration + e2e).
- Add rate limiting + helmet security middleware.

