# Secure File Sharing API

A robust Node.js and Express backend for authenticated file metadata management with role-based access control. Users can securely register, log in, manage their files with pagination and search capabilities, while admin users can oversee all system files.

## 📋 Project Overview

Secure File Sharing API provides a complete backend solution for:
- User authentication with JWT tokens
- File metadata management (create, read, update, delete)
- File ownership verification (only owners can modify/delete)
- Advanced search and pagination for files
- Admin dashboard to view all files system-wide
- MongoDB persistence for scalability

## 🚀 Deployment

- **Live URL**: [https://secure-file-sharing-api-1iyv.onrender.com/](https://secure-file-sharing-api-1iyv.onrender.com/)
- **GitHub Repository**: [https://github.com/Pavanuppula/secure-file-sharing-api](https://github.com/Pavanuppula/secure-file-sharing-api)

## 📥 Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Pavanuppula/secure-file-sharing-api.git
   cd secure-file-sharing-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see [Environment Variables](#-environment-variables))

4. Start the server (see [Run Commands](#-run-commands))

## 🔐 Environment Variables

Create a `.env` file in the project root. Use `.env.example` as a template:

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### Variable Details:
- **PORT** - Server port (optional, default: `5000`)
- **MONGODB_URI** - MongoDB connection string (required)
- **JWT_SECRET** - Secret key for JWT token signing (required)

See `.env.example` for a template.

## ▶️ Run Commands

### Development Mode (with hot reload):
```bash
npx nodemon src/server.js
```

### Production Mode:
```bash
node src/server.js
```

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

#### Register User
```
POST /api/auth/register
```
- **Description**: Create a new user account
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Validation**:
  - `name` (string, required)
  - `email` (string, required, valid email)
  - `password` (string, required, minimum 6 characters)
- **Response**: `201 Created` with user details

#### Login User
```
POST /api/auth/login
```
- **Description**: Authenticate and receive JWT token
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` with JWT token
  ```json
  {
    "message": "Login Successful",
    "token": "eyJhbGc..."
  }
  ```

### File Management Routes

> **Authentication Required**: All file endpoints require `Authorization: Bearer <token>` header

#### Create File
```
POST /api/files
```
- **Description**: Create a new file record
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "fileName": "document.pdf",
    "fileType": "application/pdf",
    "fileSize": 2048576,
    "fileUrl": "https://example.com/files/document.pdf",
    "isPublic": false
  }
  ```
- **Response**: `201 Created` with file details

#### Get User's Files (with Pagination & Search)
```
GET /api/files?page=1&limit=5&search=document
```
- **Description**: List files uploaded by authenticated user
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `page` (number, optional, default: `1`)
  - `limit` (number, optional, default: `5`)
  - `search` (string, optional, searches file name)
- **Response**: `200 OK`
  ```json
  {
    "total": 10,
    "page": 1,
    "limit": 5,
    "files": [...]
  }
  ```

#### Get Single File
```
GET /api/files/:id
```
- **Description**: Retrieve a specific file by ID
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with file details or `404 Not Found`

#### Update File
```
PUT /api/files/:id
```
- **Description**: Update file details (owner only)
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Any file fields to update
- **Access Control**: Only the file owner can update
- **Response**: `200 OK` with updated file or `403 Access Denied`

#### Delete File
```
DELETE /api/files/:id
```
- **Description**: Delete a file (owner only)
- **Headers**: `Authorization: Bearer <token>`
- **Access Control**: Only the file owner can delete
- **Response**: `200 OK` or `403 Access Denied`

### Admin Routes

#### Get All Files (Admin Only)
```
GET /api/files/admin/all
```
- **Description**: List all files in the system
- **Headers**: `Authorization: Bearer <token>`
- **Access Control**: Requires `role: admin`
- **Response**: `200 OK` with all files or `403 Admin Access Only`
- **Live Example**: [https://secure-file-sharing-api-1iyv.onrender.com/api/files/admin/all](https://secure-file-sharing-api-1iyv.onrender.com/api/files/admin/all)

## 🔒 Security Features

- JWT-based authentication with 7-day expiration
- Password hashing using bcryptjs
- File ownership verification for update/delete operations
- Role-based access control (user vs admin)
- Authorization header validation on protected routes

## 📁 Project Structure

```
src/
├── server.js                 # Entry point
├── config/
│   └── db.js                # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic
│   └── fileController.js    # File CRUD logic
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   ├── adminMiddleware.js   # Admin role check
│   └── errorMiddleware.js   # Error handling
├── models/
│   ├── User.js              # User schema
│   └── File.js              # File schema
└── routes/
    ├── authRoutes.js        # Auth endpoints
    └── fileRoutes.js        # File endpoints
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors
- **Development**: Nodemon

## 📝 Usage Example

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "password": "securepass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "securepass123"
  }'
```

### 3. Create a File (use token from login)
```bash
curl -X POST http://localhost:5000/api/files \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "fileName": "report.pdf",
    "fileType": "application/pdf",
    "fileSize": 1024000,
    "fileUrl": "https://example.com/report.pdf"
  }'
```

### 4. Search User's Files
```bash
curl -X GET "http://localhost:5000/api/files?page=1&limit=10&search=report" \
  -H "Authorization: Bearer <token>"
```

## ✨ Key Features

- ✅ User registration and authentication
- ✅ JWT token-based security
- ✅ File pagination (customizable page size)
- ✅ File search by name
- ✅ Owner-only file modifications
- ✅ Admin access to all files
- ✅ MongoDB data persistence
- ✅ Comprehensive error handling
- ✅ CORS enabled for cross-origin requests

## 📌 Notes

- JWT tokens expire after 7 days
- Passwords are hashed using bcryptjs with salt factor 10
- File ownership is enforced using MongoDB ObjectId comparison
- Admin role must be set directly in the database
- Search is case-insensitive regex matching
- Pagination uses skip and limit for efficient querying

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is open source and available under the ISC license.

## 📞 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/Pavanuppula/secure-file-sharing-api/issues).

---

**Repository**: [https://github.com/Pavanuppula/secure-file-sharing-api](https://github.com/Pavanuppula/secure-file-sharing-api)  
**Deployment**: [https://secure-file-sharing-api-1iyv.onrender.com/](https://secure-file-sharing-api-1iyv.onrender.com/)
