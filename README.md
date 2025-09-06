1. Project Overview
The Subscription Tracker is a secure and scalable backend service designed to help users manage their recurring subscriptions. This RESTful API provides a complete solution for user authentication, subscription management, and data security, built on a modern Node.js and Express.js stack.
The architecture emphasizes a clean separation of concerns, robust security practices, and data integrity, making it a reliable foundation for any client-side application (web or mobile) to build upon.
2. Key Features
Robust Authentication: Secure user sign-up and sign-in functionality using JSON Web Tokens (JWT) for stateless, token-based authorization.
Proactive Security: Integrated with Arcjet for out-of-the-box protection against common web attacks, bot detection, and rate limiting.
Data Integrity: Leverages Mongoose transactions during user creation to ensure atomic operations, preventing partial or corrupt data entries.
Modular & Scalable Architecture: A well-defined project structure with distinct layers for routing, controllers (business logic), models (data), and middleware.
Comprehensive Data Modeling: Detailed Mongoose schemas with built-in validation and pre-save hooks for automated logic, such as calculating renewal dates.
Environment-Specific Configuration: Utilizes .env files for managing different configurations across development and production environments.
3. Tech Stack
Category	Technology / Library
Backend	Node.js, Express.js
Database	MongoDB, Mongoose (ODM)
Authentication	JSON Web Token (jsonwebtoken), bcryptjs
Security	Arcjet (WAF, Rate Limiting, Bot Detection)
Configuration	dotenv
Middleware	cookie-parser
4. Project Structure
The project follows a standard, scalable structure to ensure a clear separation of concerns:
subscription-tracker/
├── config/
│   └── env.js              # Environment variable configuration
├── db/
│   └── mongoDB.js          # MongoDB connection logic
├── Middleware/
│   ├── auth.middleware.js  # JWT authorization middleware
│   ├── error.middleware.js # Centralized error handler
│   └── arcjet.middleware.js# Arcjet security middleware
├── models/
│   ├── user.model.js       # User schema and model
│   └── subscription.model.js # Subscription schema and model
├── controllers/
│   ├── auth.controller.js  # Logic for user sign-up, sign-in
│   ├── user.controller.js  # Logic for user-related operations
│   └── subscription.controller.js # Logic for subscription CRUD
├── routes/
│   ├── auth.routes.js      # Defines authentication endpoints
│   ├── user.routes.js      # Defines user endpoints
│   └── subscription.routes.js # Defines subscription endpoints
├── app.js                  # Main Express application setup
├── package.json
└── .env.development.local  # Local environment variables (NOT committed)
5. Getting Started
Follow these instructions to get the project up and running on your local machine.
Prerequisites
Node.js (v18 or later recommended)
MongoDB Atlas account or a local MongoDB instance.
Arcjet account for a site key (optional, but recommended).
Installation & Setup
Clone the repository:
git clone https://github.com/your-username/subscription-tracker.git
cd subscription-tracker
Install dependencies:
npm install
Configure Environment Variables:
Create a file named .env.development.local in the root of the project and add the following variables. This file should never be committed to version control.
Env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourDatabaseName

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_that_is_very_long
JWT_EXPIRES_IN=1d

# Arcjet Security (Optional)
ARCJET_KEY=your_arcjet_site_key
Run the application:
For development with live reloading:
npm run dev
To run in production mode:
npm start
The API should now be running on http://localhost:3001.
6. API Endpoints
The API is versioned under /api/v1/.
Method	Endpoint	Description	Authentication
POST	/auth/sign-up	Register a new user.	Public
POST	/auth/sign-in	Log in a user and receive a JWT.	Public
GET	/users	Get a list of all users.	Public (for now)
GET	/users/:id	Get details for a specific user.	Protected (JWT)
POST	/subscriptions	Create a new subscription for the logged-in user.	Protected (JWT)
GET	/subscriptions/user/:id	Get all subscriptions for a specific user.	Protected (JWT)
Authentication Note: Protected routes require a Bearer token in the Authorization header.
Example Request:
GET /api/v1/users/60d...
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
7. Future Enhancements (Roadmap)
Complete CRUD Operations: Implement UPDATE and DELETE functionality for Users and Subscriptions.
Renewal Notifications: Add a mechanism (e.g., cron job, message queue) to notify users of upcoming subscription renewals.
Data Aggregation & Analytics: Create endpoints to provide users with analytics on their spending by category, frequency, etc.
Password Reset Functionality: Implement a secure "Forgot Password" flow.
Enhanced Validation: Add more sophisticated request body validation using a library like Joi or express-validator.
