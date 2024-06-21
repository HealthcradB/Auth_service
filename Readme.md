# Auth Service

The Auth Service is responsible for user authentication and authorization in our application. This service handles user registration, login, token generation, and other related operations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Service](#running-the-service)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HealthcradB/Auth_service.git
   cd Auth_service
Install dependencies:
bash
Copy code
npm install
Environment Variables
Create a .env file in the root directory and add the following environment variables:

plaintext
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth_service
JWT_SECRET=your_jwt_secret
Running the Service
To start the service in development mode:

bash
Copy code
npm run dev
To start the service in production mode:

bash
Copy code
npm start
API Endpoints
User Registration
Endpoint: /api/auth/register
Method: POST
Description: Register a new user.
Request Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "password": "password123",
  "dateOfBirth": "1990-01-01",
  "gender": "men"
}
Response:
json
Copy code
{
  "message": "User registered successfully",
  "user": {
    "_id": "60c72b2f4f1a2c001f7e8d44",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "gender": "men",
    "isAdmin": false,
    "pharmacies": [],
    "cart": [],
    "wishlist": [],
    "orders": [],
    "addresses": [],
    "createdAt": "2021-06-14T08:29:03.544Z",
    "updatedAt": "2021-06-14T08:29:03.544Z"
  }
}
User Login
Endpoint: /api/auth/login
Method: POST
Description: Login a user.
Request Body:
json
Copy code
{
  "email": "john.doe@example.com",
  "password": "password123"
}
Response:
json
Copy code
{
  "message": "User logged in successfully",
  "token": "jwt_token"
}
Get User Profile
Endpoint: /api/auth/profile
Method: GET
Description: Get the profile of the logged-in user.
Headers:
plaintext
Copy code
Authorization: Bearer jwt_token
Response:
json
Copy code
{
  "_id": "60c72b2f4f1a2c001f7e8d44",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "gender": "men",
  "isAdmin": false,
  "pharmacies": [],
  "cart": [],
  "wishlist": [],
  "orders": [],
  "addresses": [],
  "createdAt": "2021-06-14T08:29:03.544Z",
  "updatedAt": "2021-06-14T08:29:03.544Z"
}
Update User Profile
Endpoint: /api/auth/profile
Method: PUT
Description: Update the profile of the logged-in user.
Headers:
plaintext
Copy code
Authorization: Bearer jwt_token
Request Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "dateOfBirth": "1990-01-01",
  "gender": "men"
}
Response:
json
Copy code
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "60c72b2f4f1a2c001f7e8d44",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "gender": "men",
    "isAdmin": false,
    "pharmacies": [],
    "cart": [],
    "wishlist": [],
    "orders": [],
    "addresses": [],
    "createdAt": "2021-06-14T08:29:03.544Z",
    "updatedAt": "2021-06-14T08:29:03.544Z"
  }
}
Contributing
We welcome contributions to improve this service. Please follow these steps to contribute:

Fork the repository.
Create a new branch: git checkout -b feature-branch-name.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature-branch-name.
Create a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

css
Copy code

Feel free to modify the details as necessary to better fit the specifics of your Auth Service
