# Feature Request Management System  
## Project Overview
This is a backend-focused implementation of a **Feature Request Management System** that is developed.

The system allows:
- Users to register, log in, submit feature requests, and view their own submissions
- Admins to view all feature requests and manage their status/visibility

**Important business rule (enforced at backend):**  
Feature requests with **duplicate titles** are not allowed.

**Current project status (as of submission):**  
- Backend is fully implemented (authentication, authorization, CRUD operations, duplicate title prevention, database persistence)  
- Frontend is **yet to be implemented** and will be added in a future update

This repository currently contains the **complete backend** code along with proper documentation.

## 🚀 Live Deployment

Backend API: https://feature-request-management-system-4jo5.onrender.com
Frontend: Coming Soon

## Tech Stack
### Backend
- **Language**: Node.js  
- **Framework**: Express.js  
- **Authentication**: JWT (JSON Web Tokens)  
- **Database**: MongoDB (via Mongoose)  
- **Environment Management**: dotenv  
- **Other libraries**: bcryptjs, express-validator, cors, etc.

### Planned Frontend (future update)
- React.js / Vite  
- React Router  
- Axios / Fetch for API calls  
- Context API or Redux for state management  
- Tailwind CSS or plain CSS

## Features Implemented (Backend)
- User registration & login (JWT token generation)
- Role-based access control (USER vs ADMIN)
- Submit new feature request (title + description)
- **Strict duplicate title prevention** (enforced in backend)
- Get all feature requests (ADMIN only)
- Get own feature requests (USER only)
- Proper error handling & input validation
- Environment variable configuration
- MongoDB persistence (no in-memory or hardcoded storage)

## API Endpoints
| Method   | Endpoint                        | Description                              | Authentication | Access     |
|----------|----------------------------------|------------------------------------------|----------------|------------|
| POST     | `/api/auth/register`            | Register new user                        | No             | Public     |
| POST     | `/api/auth/login`               | Login and receive JWT                    | No             | Public     |
| POST     | `/api/features`                 | Submit new feature request               | JWT            | USER       |
| GET      | `/api/features/my-requests`     | Get logged-in user's feature requests    | JWT            | USER       |
| GET      | `/api/features`                 | Get **all** feature requests             | JWT            | ADMIN      |
| PUT      | `/api/features/:id`             | Update feature request status/visibility | JWT            | ADMIN      |

(Full request/response examples are available in code comments or can be tested via Postman)

## Database Schema (MongoDB)

### Request Body Example(Register):
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ("USER" | "ADMIN"),
}

## ✅Response Example:
### Login Success:
{
  "success": true,
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "USER_OBJECT_ID",
    "username": "example_user",
    "email": "user@example.com",
    "role": "USER"
  }
}

### Create Feature Success:
{
  _id: ObjectId,
  title: String (unique index),
  description: String,
  submittedBy: ObjectId (ref: User),
  status: String ("PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"),
  visibility: Boolean (true/false – admin controlled),
  createdAt: Date,
  updatedAt: Date
}

### Error Response Example:
{
    "message": "User already exists"
}

How to Run Locally?
- Clone the repo
- cd backend 
- node server.js
- Create .env file with: 
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_long_random_secret_here
