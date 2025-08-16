# Document Analyser Backend

A comprehensive Node.js backend application for intelligent document analysis with AI-powered summarization, user authentication, and file management capabilities.

## 🚀 Features

### Core Functionality

- **AI-Powered Document Analysis**: Uses Google Gemini AI for intelligent document summarization
- **PDF Text Extraction**: Robust PDF processing with page count validation (2-3 pages only)
- **File Management**: Secure file upload and processing via AWS S3
- **User Authentication**: Complete user registration and login system with JWT tokens
- **Chat System**: Document-based chat functionality for user interactions
- **File Processing Pipeline**: End-to-end document processing workflow

### Technical Features

- **TypeScript**: Full TypeScript implementation with type safety
- **MongoDB Integration**: Mongoose ODM for data persistence
- **AWS S3 Integration**: Secure file storage and retrieval
- **Google Gemini AI**: Advanced AI-powered document analysis
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Zod schema validation for all endpoints
- **Error Handling**: Comprehensive error handling and custom error responses
- **Security**: Helmet.js for security headers and bcrypt for password hashing

## 🏗️ Architecture

### Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cloud Storage**: AWS S3
- **AI Service**: Google Gemini AI
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Zod schema validation
- **Security**: Helmet.js, CORS

### Project Structure

```
src/
├── config/          # Configuration files (DB, S3, Gemini AI)
├── controller/      # Request handlers
├── middlewares/     # Custom middleware (auth, error handling)
├── models/          # MongoDB schemas
├── routes/          # API route definitions
├── schemas/         # Zod validation schemas
├── services/        # Business logic (Gemini AI service)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Application entry point
```

## 📋 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### File Management

- `POST /api/upload/generate-upload-url` - Generate S3 upload URL
- `POST /api/upload/generate-download-url` - Generate S3 download URL
- `POST /api/files/process` - Process uploaded PDF with AI analysis

### User Management

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔧 PDF Processing Workflow

The application includes a comprehensive PDF processing pipeline:

1. **File Upload**: Generate secure S3 upload URL
2. **File Processing**: Download from S3 and validate PDF
3. **Text Extraction**: Extract clean text content from PDF
4. **AI Analysis**: Generate intelligent summary using Gemini AI
5. **Data Storage**: Store file data and create chat session
6. **Response**: Return processed results with file and chat data

### PDF Validation

- **Format Validation**: Only accepts valid PDF files
- **Page Count Restriction**: Processes PDFs with 2-3 pages only
- **File Size Limit**: Maximum 10MB per file
- **Content Extraction**: Extracts clean text and metadata

## 🤖 AI-Powered Analysis

### Gemini AI Integration

- **Intelligent Summarization**: Generates 80-100 word summaries
- **Content Analysis**: Identifies document purpose and use cases
- **Humanized Output**: Professional, clear, and digestible summaries
- **Context Awareness**: Understands document context and relevance

### Summary Features

- Clear and persuasive language
- Professional tone suitable for applications
- Identifies document purpose and use cases
- Clean, professional, and decent language

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with 12 salt rounds
- **Input Validation**: Comprehensive Zod schema validation
- **Security Headers**: Helmet.js for enhanced security
- **CORS Protection**: Configurable CORS settings
- **Error Handling**: Secure error responses without sensitive data

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- AWS S3 bucket
- Google Gemini AI API key

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd Document-Analyser-Backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run in development mode
npm run dev

# Build for production
npm run build
npm start
```

### Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

## 🚀 Usage Examples

### File Processing Request

```json
POST /api/files/process
{
  "key": "s3-file-key",
  "name": "document.pdf",
  "size": 1024000,
  "contentType": "application/pdf"
}
```

### Response

```json
{
  "success": true,
  "message": "File Processed Successfully",
  "data": {
    "file": {
      "fileName": "document.pdf",
      "extractedText": "...",
      "summary": "AI-generated summary...",
      "userID": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "chat": {
      "userID": "user_id",
      "fileID": "file_id",
      "isDeleted": false,
      "isArchived": false
    }
  }
}
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Comprehensive error handling
- Input validation with Zod

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.
