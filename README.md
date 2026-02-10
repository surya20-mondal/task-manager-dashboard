📝 Task Manager Dashboard

A full-stack Task Manager Dashboard application built with React, Node.js, Express, and MongoDB Atlas.
This project demonstrates authentication, protected routes, and CRUD operations on tasks, built as part of a frontend/full-stack internship assignment.

🚀 Features

🔐 User Authentication (Register / Login / Logout)

🛡️ JWT-based protected routes

🔒 Password hashing with bcrypt

👤 Fetch and display user profile

✅ Create, Read, Update, Delete (CRUD) tasks

🔍 Search and filter tasks

📱 Responsive UI

⚙️ Clean and scalable project structure

🛠️ Tech Stack
Frontend

React (Vite)

Axios

React Router

CSS / Tailwind (or custom CSS)

Backend

Node.js

Express.js

MongoDB (MongoDB Atlas)

Mongoose

JWT (jsonwebtoken)

bcrypt

📁 Project Structure
task-manager-dashboard/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
    .env.example
  frontend/
    src/
      components/
      context/
      pages/
      services/
      App.jsx
      main.jsx
  docs/
  README.md

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/surya20-mondal/task-manager-dashboard.git
cd task-manager-dashboard

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/:

PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/task_manager_dashboard?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d


Replace USERNAME and PASSWORD with your MongoDB Atlas database user credentials.

Start the backend server:

npm run dev


You should see:

MongoDB connected
Server running on port 5000


Test in browser:

http://localhost:5000

3️⃣ Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5173

🔗 API Endpoints
Auth

POST /api/auth/register → Register a new user

POST /api/auth/login → Login user

GET /api/auth/profile → Get logged-in user profile (protected)

Tasks

GET /api/tasks → Get all tasks (protected)

POST /api/tasks → Create a new task (protected)

PUT /api/tasks/:id → Update a task (protected)

DELETE /api/tasks/:id → Delete a task (protected)

🔐 Security

Passwords are hashed using bcrypt

Authentication is handled using JWT

Protected routes require a valid token

Token is sent using Authorization: Bearer <token> header

📈 Scalability & Production Improvements

Add refresh tokens and token rotation

Add role-based access control (admin/user)

Add pagination and indexing for large datasets

Add caching layer (Redis)

Add rate limiting and request validation

Deploy backend (Render / AWS) and frontend (Vercel / Netlify)

Add CI/CD pipeline

👨‍💻 Author

Surya Mondal
BCA Student | Aspiring Frontend / Full-Stack Developer
GitHub: https://github.com/surya20-mondal

📄 License

This project is built for learning and internship assignment purposes.

