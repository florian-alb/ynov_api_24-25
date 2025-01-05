Ynov API 2024-2025

# Email API Service

A RESTful API service for managing emails, built with Express.js and TypeScript. This service provides endpoints for handling messages, user authentication, signatures, and folder management.

## 📋 Features

- 🔐 User authentication (login/register)
- 📧 Email message management
- 📁 Folder organization
- ✍️ Email signature management
- 📚 OpenAPI documentation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd email-api
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/email_db
JWT_SECRET=your-secret-key
```

5. Run database migrations:

```bash
npx prisma migrate dev --name init
```

### 🏃‍♂️ Running the Application

Development mode:

```bash
npm run dev
```

## 📖 API Documentation

The API is documented using OpenAPI 3.0 specification. You can access the documentation via Swagger documentation (available at http://localhost:3000/api-docs):

## 🔍 API Endpoints

### Authentication

- POST `/user/login` - User login
- POST `/user/register` - User registration

### User

- GET `/user` - Logged in user informations
- PUT `/user` - Update logged in user password / Username
- DELETE `/user` - Delete logged in user

### Messages

- GET `/messages` - List all messages
- POST `/messages` - Create a new message
- GET `/messages/:id` - Get message details
- PUT `/messages/:id` - Update a message
- DELETE `/messages/:id` - Delete a message
- PUT `/messages/:id/status` - Update a message status
- PUT `/messages/:id/move` - Move a message to a folder
- PUT `/messages/:id/favorite` - Mark a message as favourite
- PUT `/messages/:id/trash` - Move a message to the trash
- PUT `/messages/:id/send` - Send a message

### Folders

- GET `/folders` - List all folders
- POST `/folders` - Create a new folder
- GET `/folders/:id` - Get folder details
- PUT `/folders/:id` - Update a folder
- DELETE `/folders/:id` - Delete a folder

### Signatures

- GET `/signatures` - List user signatures
- GET `/signatures/active` - Get active signature
- POST `/signatures` - Create a signature
- GET `/signatures/:id` - Get a signature by id
- PUT `/signatures/:id` - Update a signature
- DELETE `/signatures/:id` - Delete a signature

## 📦 Project Structure

```
src/
├── controllers/     # Route controllers
├── middlewares/    # Express middlewares
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
├── utils/          # Utility functions
└── openApi/        # API documentation
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```
