# Codebase Index - MERN Stack User Management System

## Project Overview
A complete MERN (MongoDB, Express.js, React, Node.js) stack application implementing secure user management with role-based access control (RBAC).

**Location**: `/home/darshanb/Desktop/MERN stack user management`  
**Total Files**: 51 files  
**Languages**: JavaScript, CSS, HTML, Markdown  
**Frameworks**: Express.js, React, Mongoose  

---

## Directory Structure

### Root Level
```
MERN stack user management/
├── .git/                          # Git repository
├── .gitignore                     # Git ignore rules
├── docker-compose.yml             # Multi-container orchestration
├── README.md                      # Main documentation
├── DEPLOYMENT.md                  # Deployment guide
├── DEVELOPMENT.md                 # Development setup
├── API_REFERENCE.md               # API documentation
├── PROJECT_SUMMARY.md             # Project overview
├── REQUIREMENTS_CHECKLIST.md      # Requirements fulfillment
├── backend/                       # Node.js backend
└── frontend/                      # React frontend
```

### Backend Structure
```
backend/
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore                     # Backend-specific ignores
├── Dockerfile                     # Backend container config
├── package.json                   # Dependencies and scripts
├── server.js                      # Express application entry point
├── seed.js                        # Database seeding script
├── config/
│   └── database.js                # MongoDB connection setup
├── controllers/
│   ├── authController.js          # Authentication logic (login/register)
│   └── userController.js          # User management logic (CRUD)
├── middleware/
│   ├── auth.js                    # JWT authentication middleware
│   └── authorize.js               # RBAC authorization middleware
├── models/
│   └── User.js                    # Mongoose User schema
├── routes/
│   ├── authRoutes.js              # Authentication endpoints
│   └── userRoutes.js              # User management endpoints
└── utils/
    └── tokenUtils.js              # JWT token generation utilities
```

### Frontend Structure
```
frontend/
├── .env                           # Environment variables
├── .gitignore                     # Frontend-specific ignores
├── Dockerfile                     # Frontend container config
├── package.json                   # Dependencies and scripts
├── public/
│   └── index.html                 # HTML template
└── src/
    ├── App.css                   # Global styles
    ├── App.jsx                   # Root React component
    ├── index.js                  # React application entry point
    ├── components/
    │   ├── Navbar.jsx            # Navigation component
    │   └── ProtectedRoute.jsx   # Route protection wrapper
    ├── context/
    │   └── AuthContext.jsx       # Authentication state management
    ├── pages/
    │   ├── Dashboard.jsx          # Role-based dashboard
    │   ├── Login.jsx             # User login page
    │   ├── Register.jsx          # User registration page
    │   ├── Profile.jsx           # User profile management
    │   ├── UserList.jsx          # User list with pagination
    │   ├── UserDetail.jsx        # Individual user details
    │   └── UserForm.jsx          # Create/edit user form
    ├── services/
    │   ├── api.js                # Axios HTTP client configuration
    │   └── userService.js        # User API service functions
    └── styles/
        ├── Auth.css              # Login/Register styles
        ├── Dashboard.css         # Dashboard styles
        ├── Navbar.css            # Navigation styles
        ├── Profile.css           # Profile page styles
        ├── UserDetail.css        # User detail styles
        ├── UserForm.css          # User form styles
        └── UserList.css          # User list styles
```

---

## File Index by Category

### Backend Files (17 files)

#### Configuration & Setup
- `backend/.env` - Environment variables (JWT secret, DB URI, etc.)
- `backend/.env.example` - Environment template
- `backend/.gitignore` - Backend-specific ignore rules
- `backend/Dockerfile` - Docker container configuration
- `backend/package.json` - Dependencies and npm scripts
- `backend/server.js` - Main Express application

#### Database & Models
- `backend/config/database.js` - MongoDB connection setup
- `backend/models/User.js` - Mongoose User schema with validation
- `backend/seed.js` - Database seeding script (demo users)

#### Authentication & Security
- `backend/controllers/authController.js` - Login/register logic
- `backend/routes/authRoutes.js` - Auth API endpoints
- `backend/middleware/auth.js` - JWT token verification
- `backend/middleware/authorize.js` - Role-based access control
- `backend/utils/tokenUtils.js` - JWT generation utilities

#### User Management
- `backend/controllers/userController.js` - CRUD operations for users
- `backend/routes/userRoutes.js` - User management API endpoints

### Frontend Files (23 files)

#### Configuration & Setup
- `frontend/.env` - Environment variables (API URL)
- `frontend/.gitignore` - Frontend-specific ignore rules
- `frontend/Dockerfile` - Docker container configuration
- `frontend/package.json` - Dependencies and npm scripts
- `frontend/public/index.html` - HTML template
- `frontend/src/index.js` - React application entry point

#### Core Application
- `frontend/src/App.jsx` - Root React component with routing
- `frontend/src/App.css` - Global application styles

#### Components & UI
- `frontend/src/components/Navbar.jsx` - Navigation bar component
- `frontend/src/components/ProtectedRoute.jsx` - Route protection wrapper
- `frontend/src/context/AuthContext.jsx` - Authentication state management

#### Pages (7 files)
- `frontend/src/pages/Login.jsx` - User login interface
- `frontend/src/pages/Register.jsx` - User registration interface
- `frontend/src/pages/Dashboard.jsx` - Role-based dashboard
- `frontend/src/pages/Profile.jsx` - User profile management
- `frontend/src/pages/UserList.jsx` - Paginated user list
- `frontend/src/pages/UserDetail.jsx` - Individual user details
- `frontend/src/pages/UserForm.jsx` - Create/edit user form

#### Services & API
- `frontend/src/services/api.js` - Axios HTTP client configuration
- `frontend/src/services/userService.js` - User API service functions

#### Styles (7 files)
- `frontend/src/styles/Auth.css` - Login/Register page styles
- `frontend/src/styles/Dashboard.css` - Dashboard page styles
- `frontend/src/styles/Navbar.css` - Navigation styles
- `frontend/src/styles/Profile.css` - Profile page styles
- `frontend/src/styles/UserDetail.css` - User detail page styles
- `frontend/src/styles/UserForm.css` - User form styles
- `frontend/src/styles/UserList.css` - User list styles

### Documentation Files (8 files)
- `README.md` - Main project documentation
- `DEPLOYMENT.md` - Cloud deployment guide
- `DEVELOPMENT.md` - Local development setup
- `API_REFERENCE.md` - Complete API documentation
- `PROJECT_SUMMARY.md` - Project overview and features
- `REQUIREMENTS_CHECKLIST.md` - Assessment requirements fulfillment
- `.gitignore` - Root-level git ignore rules

### Configuration Files (3 files)
- `docker-compose.yml` - Multi-container orchestration
- `backend/.env` - Backend environment variables
- `frontend/.env` - Frontend environment variables

---

## Key Files by Functionality

### Authentication Flow
- **Backend**: `authController.js`, `authRoutes.js`, `auth.js` (middleware)
- **Frontend**: `Login.jsx`, `Register.jsx`, `AuthContext.jsx`, `ProtectedRoute.jsx`

### User Management
- **Backend**: `userController.js`, `userRoutes.js`, `User.js` (model)
- **Frontend**: `UserList.js`, `UserDetail.js`, `UserForm.js`, `userService.js`

### Authorization (RBAC)
- **Backend**: `authorize.js` (middleware)
- **Frontend**: Role-based rendering in components

### Database Operations
- **Connection**: `database.js`
- **Schema**: `User.js`
- **Seeding**: `seed.js`

### API Layer
- **Backend**: Route files (`authRoutes.js`, `userRoutes.js`)
- **Frontend**: Service files (`api.js`, `userService.js`)

### UI Components
- **Navigation**: `Navbar.jsx`
- **Pages**: All files in `pages/` directory
- **Styling**: Corresponding CSS files in `styles/`

---

## File Dependencies & Relationships

### Backend Dependencies
```
server.js
├── config/database.js          # Database connection
├── routes/authRoutes.js        # Auth endpoints
│   └── controllers/authController.js
├── routes/userRoutes.js        # User endpoints
│   ├── controllers/userController.js
│   ├── middleware/auth.js      # JWT verification
│   └── middleware/authorize.js # RBAC
├── models/User.js              # User schema
└── utils/tokenUtils.js         # Token utilities
```

### Frontend Dependencies
```
App.jsx
├── context/AuthContext.jsx      # Auth state
├── components/Navbar.jsx        # Navigation
├── components/ProtectedRoute.jsx # Route protection
├── services/api.js             # HTTP client
├── services/userService.js     # API calls
└── pages/                      # Page components
    ├── Login.jsx
    ├── Register.jsx
    ├── Dashboard.jsx
    ├── Profile.jsx
    ├── UserList.jsx
    ├── UserDetail.jsx
    └── UserForm.jsx
```

---

## File Sizes & Line Counts

### Backend Files
- `server.js`: Main application setup
- `User.js`: Mongoose schema with validation
- `authController.js`: Authentication logic
- `userController.js`: CRUD operations with RBAC
- `authRoutes.js`: Route definitions with validation
- `userRoutes.js`: User management routes
- `auth.js`: JWT middleware
- `authorize.js`: RBAC middleware
- `database.js`: MongoDB connection
- `tokenUtils.js`: JWT utilities
- `seed.js`: Demo data creation

### Frontend Files
- `App.jsx`: Routing and main component
- `AuthContext.jsx`: State management
- `api.js`: Axios configuration
- `userService.js`: API service functions
- Page components: Form handling and UI logic
- CSS files: Responsive styling

---

## Development Workflow

### Starting Development
1. **Backend**: `cd backend && npm run dev`
2. **Frontend**: `cd frontend && npm start`
3. **Database**: MongoDB running locally or Atlas

### Building for Production
1. **Backend**: `npm start` (after build)
2. **Frontend**: `npm run build`
3. **Docker**: `docker-compose up --build`

### Testing
- **API**: Use Postman with endpoints in `API_REFERENCE.md`
- **UI**: Test different user roles
- **Database**: Check seeded data

---

## Security & Best Practices

### Implemented Security Features
- JWT authentication with expiration
- Bcrypt password hashing
- Input validation on all endpoints
- CORS configuration
- Environment variables for secrets
- Role-based access control
- Soft delete for users
- Audit trail tracking

### Code Quality
- Clean architecture with separation of concerns
- Meaningful variable names and comments
- Error handling and validation
- Responsive design
- Git version control with meaningful commits

---

## Deployment Ready

### Supported Platforms
- **Render** (recommended)
- **Railway**
- **Vercel** (frontend) + Render (backend)
- **Docker** (any container hosting)

### Configuration Files
- `docker-compose.yml`: Local development
- `Dockerfile` (backend/frontend): Container builds
- Environment files: Production configuration

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.com | admin123 |
| Manager | manager@demo.com | manager123 |
| User | user@demo.com | user123 |

---

## Quick Start Commands

```bash
# Clone and setup
cd "MERN stack user management"
cd backend && npm install
cd ../frontend && npm install

# Seed database (requires MongoDB)
cd ../backend && npm run seed

# Start development
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm start

# Docker deployment
docker-compose up --build
```

---

## File Count Summary

- **Total Files**: 51
- **Backend**: 17 files (JavaScript, JSON, env, Dockerfile)
- **Frontend**: 23 files (JavaScript, JSX, CSS, HTML, env, Dockerfile)
- **Documentation**: 8 files (Markdown)
- **Configuration**: 3 files (YAML, env)

---

*This index provides a complete overview of the MERN Stack User Management System codebase. All files are organized, documented, and ready for development or deployment.*

**Last Updated**: April 14, 2026
**Status**: Complete and Production Ready