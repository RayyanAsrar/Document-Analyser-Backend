# Document Analyser Backend

A robust Node.js + TypeScript + Express backend API with MongoDB integration, JWT authentication, and comprehensive error handling.

## 🚀 Features

- ⚡ **Fast Development**: Live reloading with ts-node-dev
- 🔒 **Security**: JWT authentication, bcrypt password hashing, Helmet.js security headers
- 🌐 **CORS Enabled**: Cross-origin resource sharing support
- 📝 **Logging**: Morgan HTTP request logger
- 🛡️ **Error Handling**: Comprehensive error handling middleware
- 📦 **TypeScript**: Full TypeScript support with strict configuration
- 🔧 **Environment Variables**: dotenv for configuration management
- 🗄️ **Database**: MongoDB with Mongoose ODM
- ✅ **Validation**: Zod schema validation for request bodies
- 🔐 **Authentication**: JWT-based authentication with role-based access

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud instance)

## 🛠️ Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd Document-Analyser-Backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/document-analyser
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

| Script          | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start development server with live reload |
| `npm run build` | Build for production                      |
| `npm start`     | Start production server                   |
| `npm run clean` | Clean build directory                     |

## 🏗️ Project Structure

```
src/
├── config/
│   ├── database.ts          # MongoDB connection configuration
│   └── env.ts              # Environment variables configuration
├── controller/
│   ├── auth.controller.ts   # Authentication logic
│   └── user.controller.ts   # User management logic
├── middlewares/
│   ├── auth.middleware.ts   # JWT authentication middleware
│   └── error.middleware.ts  # Global error handling
├── models/
│   └── user.model.ts        # User MongoDB model
├── routes/
│   ├── auth.routes.ts       # Authentication routes
│   ├── user.routes.ts       # User routes
│   └── index.ts            # Route exports
├── schemas/
│   └── user.schema.ts       # Zod validation schemas
├── types/
│   └── express.d.ts         # Express type extensions
├── utils/
│   ├── asyncHandler.ts      # Async error handler wrapper
│   ├── response.ts          # Standardized API response
│   ├── token.ts            # JWT token utilities
│   └── validation.ts       # Request validation utilities
├── app.ts                   # Express app configuration
└── index.ts                # Server entry point
```

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000
```

### Health Check

- **GET** `/health` - Health check endpoint

### Authentication Endpoints

#### Register User

- **POST** `/api/auth/register`

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe",
  "profileImage": "https://example.com/avatar.jpg",
  "provider": "credentials",
  "role": "user"
}
```

**Required Fields:**

- `username` (string, 3-16 characters)
- `email` (valid email format)
- `password` (string, 6-16 characters)
- `name` (string)

**Optional Fields:**

- `profileImage` (valid URL)
- `provider` (enum: "google" | "credentials", default: "credentials")
- `role` (enum: "user" | "admin", default: "user")

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "username": "johndoe",
      "email": "john@example.com",
      "name": "John Doe",
      "profileImage": "https://example.com/avatar.jpg",
      "role": "user",
      "provider": "credentials"
    }
  }
}
```

#### Login User

- **POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Required Fields:**

- `email` (valid email format)
- `password` (string, 6-16 characters)

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "username": "johndoe",
      "email": "john@example.com",
      "name": "John Doe",
      "profileImage": "https://example.com/avatar.jpg",
      "role": "user",
      "provider": "credentials"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### User Endpoints

#### Get Current User

- **GET** `/api/user/current`

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Current User Found",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe",
    "profileImage": "https://example.com/avatar.jpg",
    "role": "user",
    "provider": "credentials"
  }
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to get a JWT token
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## 📊 Response Format

All API responses follow a standardized format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | null,
}
```

## ⚠️ Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid credentials)
- **404** - Not Found
- **500** - Internal Server Error

**Error Response Example:**

```json
{
  "success": false,
  "message": Message
}
```

## 🔧 Environment Variables

| Variable     | Description               | Default       | Required |
| ------------ | ------------------------- | ------------- | -------- |
| `NODE_ENV`   | Environment mode          | `development` | No       |
| `PORT`       | Server port               | `3000`        | No       |
| `MONGO_URI`  | MongoDB connection string | -             | Yes      |
| `JWT_SECRET` | JWT signing secret        | -             | Yes      |

## 🚀 Development

The project uses `ts-node-dev` for development with the following features:

- **Live Reloading**: Automatically restarts the server when files change
- **TypeScript Compilation**: On-the-fly TypeScript compilation
- **Fast Startup**: Optimized for development speed

## 🏭 Production

For production deployment:

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Set production environment variables**:

   ```env
   NODE_ENV=production
   PORT=3000
   MONGO_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ```

3. **Start the production server**:
   ```bash
   npm start
   ```

## 🧪 Testing API Endpoints

You can test the API endpoints using tools like:

- **Postman**
- **cURL**
- **Thunder Client (VS Code extension)**

### Example cURL Commands

**Register a new user:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get current user (with token):**

```bash
curl -X GET http://localhost:3000/api/user/current \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📦 Dependencies

### Production Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `zod` - Schema validation
- `cors` - CORS middleware
- `helmet` - Security headers
- `morgan` - HTTP request logging
- `dotenv` - Environment variables
- `http-errors` - HTTP error handling

### Development Dependencies

- `typescript` - TypeScript compiler
- `ts-node-dev` - Development server
- `@types/*` - TypeScript type definitions
- `rimraf` - Cross-platform rm -rf
- `tsc-alias` - TypeScript path alias resolver

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with authentication and user management
