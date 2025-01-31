# Product Management

## Overview
This is a **MERN stack** application built for product management. The application allows users to manage products with categories, subcategories, images, and search functionalities.

## Repository
[GitHub Repository](https://github.com/Chaithra-KR/Product-Management)

## Tech Stack
- **Frontend:** React.js, Context API, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local instance)
- **Authentication:** JWT (JSON Web Token)
- **Image Upload:** Multer (stored in `uploads` folder)

## Installation & Setup
### Prerequisites
- Node.js installed
- MongoDB (running locally or hosted on MongoDB Atlas)

### Clone the Repository
```sh
git clone https://github.com/Chaithra-KR/Product-Management.git
cd Product-Management
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Start the server:
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:5000/`

3. **env keys at backend:**
   - DBC=mongodb://localhost:27017/product-management
   - PORT=5000
   - JWT_SECRET

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Start the frontend:
   ```sh
   npm run dev
   ```
3. **env keys at frontend:**

   - BASE_URL=http://localhost:5000/api/v1

## Notes
- The backend and frontend should run separately.
- **MongoDB must be running locally** (or use an external database connection).
- **Uploads folder is required** for storing product images.

