# User Management System - MERN Stack

A full-stack User Management System built with the MERN (MongoDB, Express.js, React, Node.js) stack. This application implements secure authentication, role-based access control (RBAC), and complete user lifecycle management.

## 🚀 Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication with bcrypt password hashing
- **Role-Based Access Control (RBAC)**: Three role levels - Admin, Manager, and User
- **Secure Session Management**: Token persistence with automatic validation
- **Protected Routes**: Client and server-side route protection

### User Management
- **Create Users**: Admin can create new users with auto-generated passwords
- **View Users**: Paginated user list with search and filter capabilities
- **Update Users**: Edit user information and roles (Admin/Manager only)
- **Deactivate Users**: Soft delete functionality to deactivate users
- **Audit Trail**: Track creation and modification history with user info

### Role-Based Capabilities

#### Admin
- Full access to user management
- Create, read, update, delete (deactivate) users
- Assign and modify user roles
- View all user details and audit information

#### Manager
- View list of all users
- View and update non-admin user details
- Limited administrative capabilities

#### User
- View and manage own profile
- Update personal information and password
- Cannot modify role or access other users' data

## 📋 Tech Stack

### Frontend
- **React 18**: UI library with hooks
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API communication
- **Context API**: State management for authentication
- **CSS3**: Responsive styling

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **CORS**: Cross-origin resource sharing

### DevOps
- **Docker & Docker Compose**: Containerization and orchestration
- **MongoDB**: Local or remote database

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (or Docker for containerized setup)
- Git

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd MERN\ stack\ user\ management
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Update:
# - MONGODB_URI (if using local MongoDB)
# - JWT_SECRET (change to a secure value)
# - FRONTEND_URL (if different from localhost:3000)

# Start the backend server
npm run dev
```

Backend runs on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional)
# REACT_APP_API_URL=http://localhost:5000/api

# Start the frontend development server
npm start
```

Frontend runs on `http://localhost:3000`

### Docker Setup

#### Using Docker Compose (Recommended)
```bash
# From project root directory
docker-compose up --build

# Backend: http://localhost:5000
# Frontend: http://localhost:3000
# MongoDB: localhost:27017
```

#### Individual Docker Build
```bash
# Backend
cd backend
docker build -t user-management-backend .
docker run -p 5000:5000 -e MONGODB_URI=mongodb://localhost:27017/user-management user-management-backend

# Frontend
cd frontend
docker build -t user-management-frontend .
docker run -p 3000:3000 user-management-frontend
```

## 🔐 Default Demo Credentials

For testing purposes, seed data will be created with the following demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.com | admin123 |
| Manager | manager@demo.com | manager123 |
| User | user@demo.com | user123 |

## 📚 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
```

#### Login User
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### User Management Endpoints

#### Get All Users (Paginated)
```
GET /api/users?page=1&limit=10&search=&role=all&status=all
Headers: Authorization: Bearer <token>
```

#### Get User by ID
```
GET /api/users/:id
Headers: Authorization: Bearer <token>
```

#### Create User (Admin Only)
```
POST /api/users
Headers: Authorization: Bearer <token>
Body: { name, email, password, role, status }
```

#### Update User
```
PUT /api/users/:id
Headers: Authorization: Bearer <token>
Body: { name, email, password, role, status }
```

#### Delete/Deactivate User (Admin Only)
```
DELETE /api/users/:id
Headers: Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
MERN\ stack\ user\ management/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authorize.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── tokenUtils.js
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── UserList.js
│   │   │   ├── UserDetail.js
│   │   │   ├── UserForm.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── userService.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Navbar.css
│   │   │   ├── UserList.css
│   │   │   ├── UserDetail.css
│   │   │   ├── UserForm.css
│   │   │   └── Profile.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔒 Security Features

1. **Password Hashing**: bcryptjs with salt rounds for secure password storage
2. **JWT Tokens**: Token-based authentication with expiration
3. **Input Validation**: express-validator for server-side validation
4. **RBAC**: Role-based middleware for endpoint protection
5. **CORS**: Configured to only accept requests from authorized frontend
6. **Environment Variables**: Sensitive data stored in .env files
7. **Audit Trail**: createdBy, updatedBy tracking for accountability

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'manager', 'admin']),
  status: String (enum: ['active', 'inactive']),
  createdBy: ObjectId (ref: User),
  updatedBy: ObjectId (ref: User),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🚀 Deployment

### Deploying to Cloud Platforms

#### Option 1: Render
1. Connect GitHub repository to Render
2. Create two web services: one for backend, one for frontend
3. Set environment variables
4. Deploy automatically on push

#### Option 2: Vercel (Frontend) + Render (Backend)
- Deploy frontend to Vercel
- Deploy backend to Render
- Configure frontend environment to use Render backend URL

#### Option 3: Railway
- Connect your GitHub repository
- Create services for MongoDB, Backend, and Frontend
- Configure environment variables
- Deploy

#### Option 4: Docker Hub + Any Cloud Provider
- Push Docker images to Docker Hub
- Deploy using docker-compose or Kubernetes

### Environment Variables for Production

**Backend (.env)**
```
PORT=5000
MONGODB_URI=<production_mongodb_uri>
JWT_SECRET=<long_random_secure_string>
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=<production_frontend_url>
```

**Frontend (.env)**
```
REACT_APP_API_URL=<production_backend_url>
```

## 🧪 Testing

### Manual Testing Scenarios

1. **User Registration**
   - Create new account with valid and invalid inputs
   - Verify email uniqueness

2. **User Login**
   - Test login with correct credentials
   - Test login with incorrect passwords
   - Verify inactive user cannot login

3. **Role-Based Access**
   - Test Admin can access all features
   - Test Manager cannot modify admin users
   - Test User can only access own profile

4. **User Management**
   - Create users with different roles
   - Edit user information
   - Deactivate users
   - Verify pagination and search

## 📝 Commit History

The project maintains a meaningful commit history documenting each feature implementation:
- Initial project setup with dependencies
- Backend authentication system
- Frontend authentication flow
- User management API
- RBAC middleware implementation
- Frontend user management components
- Styling and UI/UX improvements
- Deployment configuration

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/feature-name`
2. Make your changes
3. Commit with meaningful messages: `git commit -m "Add feature description"`
4. Push to the branch: `git push origin feature/feature-name`
5. Submit a pull request

## 📄 License

This project is created for the Purple Merit Technologies MERN Stack Developer Intern Assessment.

## 👨‍💻 Author

Built as part of the MERN Stack Developer Intern Assessment by Purple Merit Technologies.

## 📧 Support

For issues or questions, please reach out to the development team.

---

**Happy Coding! 🚀**
