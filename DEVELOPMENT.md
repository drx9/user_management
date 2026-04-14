# Development Setup Guide

## Local Development Environment

This guide helps you set up and run the User Management System locally for development.

## Prerequisites

- **Node.js**: v14+ (Download from https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js
- **MongoDB**: Install from https://www.mongodb.com/try/download/community
  - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:6.0`
- **Git**: For version control

## Step 1: Clone & Setup

```bash
# Clone repository
git clone <repository-url>
cd "<repository-directory>"

# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Copy environment file (optional)
cp .env.example .env
```

## Step 2: Database Setup

### Using MongoDB Locally

1. **Start MongoDB** (if not running)
   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # Start MongoDB Community Service from Services app
   
   # Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6.0
   ```

2. **Verify MongoDB is running**
   ```bash
   mongosh
   # Should connect successfully
   # Type: exit
   ```

### Using MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-management
   ```

## Step 3: Seed Database with Demo Data

```bash
cd backend

# Need to install dependencies first if not done
npm install

# Seed database with demo users
npm run seed

# Output:
# ✓ Created 5 demo users
# ✓ Set createdBy references
# ✓ Database seeded successfully!
# Demo Credentials:
#   Admin: admin@demo.com / admin123
#   Manager: manager@demo.com / manager123
#   User: user@demo.com / user123
```

## Step 4: Start Development Servers

### Terminal 1 - Backend Server

```bash
cd backend
npm run dev

# Output:
# Server is running on port 5000
# MongoDB Connected: localhost
```

Backend will run on: `http://localhost:5000`

### Terminal 2 - Frontend Server

```bash
cd frontend
npm start

# This opens your browser to http://localhost:3000
# If not, navigate manually to http://localhost:3000
```

Frontend will run on: `http://localhost:3000`

## Step 5: Test the Application

1. **Open Frontend**: http://localhost:3000
2. **Login** with demo credentials:
   - Email: `admin@demo.com`
   - Password: `admin123`
3. **Verify Features**:
   - Dashboard shows user information
   - Can navigate to User List (for admin/manager)
   - Can access Profile page
   - Can view, edit, and create users (based on role)

## Testing Different Roles

### Admin Account
- Email: `admin@demo.com`
- Password: `admin123`
- Access: Full system access

### Manager Account
- Email: `manager@demo.com`
- Password: `manager123`
- Access: Limited admin functions

### Regular User
- Email: `user@demo.com`
- Password: `user123`
- Access: Personal profile only

## Common Development Commands

### Backend

```bash
cd backend

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database
npm run seed

# Reset database
# Delete MongoDB database or run seed again
```

### Frontend

```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests (if configured)
npm test

# Eject configuration (not recommended)
npm run eject
```

## API Testing

### Using cURL or Postman

Get JWT Token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"admin123"}'

# Response:
# {
#   "message": "Login successful",
#   "token": "eyJhbGc...",
#   "user": {...}
# }
```

Use Token in Requests:
```bash
curl http://localhost:5000/api/users \
  -H "Authorization: Bearer eyJhbGc..."
```

## Docker Development

### Using Docker Compose

```bash
# Start all services
docker-compose up --build

# Stop all services
docker-compose down

# Rebuild containers
docker-compose down && docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## Useful VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**: dsznajder.es7-react-js-snippets
- **Prettier**: esbenp.prettier-vscode
- **MongoDB for VS Code**: MongoDB.mongodb-vscode
- **Thunder Client** or **REST Client**: For API testing
- **GitLens**: For Git integration

## Debugging

### Frontend

```javascript
// Add console logs
console.log('debug info', variable);

// Use browser DevTools
// F12 or Ctrl+Shift+I
// - Console tab for logs and errors
// - Network tab for API calls
// - Application tab for localStorage
```

### Backend

```javascript
// Add console logs
console.log('request body:', req.body);

// Use Node debugger
// node --inspect-brk server.js
// Open chrome://inspect
```

## Environment Variables

### Backend (.env)
```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/user-management

# JWT
JWT_SECRET=your_development_secret_key
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is listening on port 27017

### "Port 5000/3000 already in use"
```bash
# Find and kill process
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "CORS error"
- Check that `FRONTEND_URL` in backend matches your frontend URL
- Verify frontend is making requests to correct backend URL

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "npm ERR! code ENOENT"
- Ensure you're in the correct directory (backend or frontend)
- Run `npm install` first

## Code Style & Formatting

### Automatic Formatting with Prettier

```bash
# Backend
cd backend
npm install --save-dev prettier eslint

# Format all files
npx prettier --write .

# Frontend
cd ../frontend
npm install --save-dev prettier
npx prettier --write src/
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "Add feature description"

# Push to GitHub
git push origin feature/feature-name

# Create Pull Request on GitHub
```

## Performance Tips

1. **Redux DevTools**: Install browser extension for state debugging
2. **React DevTools**: Browser extension for component debugging
3. **Network Throttling**: Test slow connections in DevTools
4. **Database Indexes**: Add indexes for frequently queried fields

## Next Steps

- Write unit tests using Jest
- Add integration tests using Supertest (backend)
- Set up CI/CD with GitHub Actions
- Add logging with Morgan (backend)
- Implement email notifications
- Add user profile pictures
- Implement two-factor authentication

---

Happy coding! 🚀
