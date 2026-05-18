# SharingAPI

## Project Overview

SharingAPI is a simple Express.js backend for managing file metadata and user authentication. It supports user registration, login, file creation, retrieval, updating, deletion, and an admin endpoint for listing all files.

## Installation Steps

1. Clone the repository or copy the project files.
2. Open a terminal in the project root folder.
3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

- `PORT` - Optional. The port where the server will run (default: `5000`).
- `MONGODB_URI` - Required. MongoDB connection URI.
- `JWT_SECRET` - Required. Secret key used to sign JWT tokens.

## Run Commands

Start the server manually:

```bash
node src/server.js
```

If you want to use `nodemon` (installed as a dependency), run:

```bash
npx nodemon src/server.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register`
  - Register a new user.
  - Request body:
    - `name` (string, required)
    - `email` (string, required)
    - `password` (string, required, minimum 6 characters)

- `POST /api/auth/login`
  - Authenticate a user and return a JWT token.
  - Request body:
    - `email` (string, required)
    - `password` (string, required)

### File Management

> All file endpoints require a valid `Authorization: Bearer <token>` header, except auth routes.

- `POST /api/files`
  - Create a new file entry.
  - Request body:
    - `fileName` (string, required)
    - `fileType` (string, required)
    - `fileSize` (number, required)
    - `fileUrl` (string, required)
    - `isPublic` (boolean, optional)

- `GET /api/files`
  - List files uploaded by the authenticated user.
  - Query parameters:
    - `page` (number, optional, default `1`)
    - `limit` (number, optional, default `5`)
    - `search` (string, optional)

- `GET /api/files/:id`
  - Get a single file by ID.

- `PUT /api/files/:id`
  - Update a file by ID.
  - Request body may include any file fields to update.

- `DELETE /api/files/:id`
  - Delete a file by ID.

### Admin Endpoint

- `GET /api/files/admin/all`
  - Returns all files in the system.
  - Requires an authenticated user with `role: admin`.

## Notes

- The application uses MongoDB for storage.
- JWT tokens expire after 7 days.
- File ownership is enforced for update/delete operations.
