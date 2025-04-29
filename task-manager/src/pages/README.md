# Task Manager App 

#  Overview
This is a full-stack task management application that allows users to:
-Register & Login with email/password  
-View, Add, Complete, Delete Tasks
-Filter Tasks by Status (All, Active, Completed)
-Secure authentication using JWT

# Technology Stack
- Frontend: React (Vite, React Router, Axios)
- Backend:Node.js, Express.js, MongoDB
- Database: MongoDB with Mongoose ORM
- Authentication:JSON Web Token (JWT)


# Setup Instructions

- Backend Setup (Node.js & Express)
cd backend
npm install
node server.js

- Frontend Setup (React & Vite)
cd task-manager
npm install axios react-router-dom
npm run dev

-Testing
mongod
cd backend
node server.js
cd task-manger
npm run dev


Test APIs using Postman
- Register: POST http://localhost:5000/auth/register
- Login: POST http://localhost:5000/auth/login
- View Tasks: GET http://localhost:5000/tasks
- Add Task: POST http://localhost:5000/tasks
- Mark Task as Complete: PUT http://localhost:5000/tasks/:id/complete
- Delete Task: DELETE http://localhost:5000/tasks/:id
- Filter Tasks: GET http://localhost:5000/tasks?status=Completed



