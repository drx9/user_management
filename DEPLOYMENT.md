# Deployment Guide - User Management System

## Quick Start for Deployment

This guide covers deploying the User Management System to various cloud platforms.

### Prerequisites
- Git repository (public on GitHub)
- MongoDB Atlas account (for cloud database) or use provided MongoDB service
- Cloud platform account (Render, Railway, Vercel, etc.)

## Deployment Options

### Option 1: Render (Recommended - Simple)

#### Backend Deployment
1. **Create MongoDB Database (Render)**
   - Go to Render dashboard
   - Create new PostgreSQL or use MongoDB Atlas
   - Copy connection string

2. **Deploy Backend**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select this repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<generate_random_secret>
     NODE_ENV=production
     FRONTEND_URL=<your_frontend_url>
     ```
   - Click "Create Web Service"
   - Note the backend URL (e.g., https://user-mgmt-backend.onrender.com)

3. **Deploy Frontend**
   - Create new Static Site on Render
   - Connect GitHub repository
   - Branch: `main` or `master`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Environment Variables:
     ```
     REACT_APP_API_URL=<your_backend_url>/api
     ```
   - Click "Create Static Site"

#### Initial Setup
After deployment, seed the database:
1. SSH into backend or use Render Shell
2. Run: `npm run seed`

---

### Option 2: Railway

1. **Connect GitHub Repository**
   - Go to https://railway.app
   - New Project → "Deploy from GitHub repo"
   - Select this repository

2. **Create Services**
   - Add MongoDB service
   - Add Node.js service (backend)
   - Add Static Site service (frontend)

3. **Configure Environment**
   - MongoDB: Railway automatically provides connection string
   - Backend service:
     ```
     MONGODB_URI=${{MongoDB.MONGO_URL}}
     JWT_SECRET=<random_secret>
     NODE_ENV=production
     FRONTEND_URL=https://<your-frontend>.up.railway.app
     ```
   - Frontend service:
     ```
     REACT_APP_API_URL=https://<your-backend>.up.railway.app/api
     ```

4. **Deploy**
   - Railway automatically deploys on push to main branch

---

### Option 3: Vercel (Frontend) + Render (Backend)

**Frontend:**
1. Go to https://vercel.com
2. Import Git repository
3. Framework: React
4. Environment Variable:
   ```
   REACT_APP_API_URL=<render_backend_url>/api
   ```
5. Deploy

**Backend:** Follow Render backend steps above

---

### Option 4: Heroku Alternative (using alternative services)

Use Render, Railway, or Fly.io as Heroku alternatives with similar deployment flows.

---

## Environment Variables Reference

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-management
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_recommended
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env)
```bash
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## Post-Deployment Steps

### 1. Seed Initial Data
```bash
# If backend is deployed on Render/Railway, use their console:
npm run seed
```

### 2. Test Connectivity
- Visit frontend URL
- Try login with demo credentials:
  - Email: admin@demo.com
  - Password: admin123

### 3. Verify CORS
- Backend should accept requests from deployed frontend URL
- Check browser console for CORS errors

### 4. Security Checklist
- [ ] Change JWT_SECRET to a strong value
- [ ] Use MongoDB Atlas with IP whitelist or use private database
- [ ] Enable HTTPS (auto-provided by Render/Vercel)
- [ ] Set DATABASE backup schedule
- [ ] Monitor logs for errors

---

## Troubleshooting

### Frontend Can't Connect to Backend
- Check `REACT_APP_API_URL` environment variable
- Verify backend is running: Open backend URL in browser, should see `{ "message": "Backend server is running" }`
- Check CORS settings in `backend/server.js`
- Verify frontend URL in backend `FRONTEND_URL` env variable

### Database Connection Error
- Check MongoDB URI format
- Verify IP whitelist in MongoDB Atlas (if using)
- Test connection: `mongosh "mongodb+srv://..."`

### Login Fails
- Check if database is seeded: `npm run seed`
- Verify JWT_SECRET matches between deployments
- Check user status (must be 'active')

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Check for .env file issues (should be auto-detected for buildenv variables)

---

## Monitoring & Logs

### Render
- View logs in Render dashboard
- Monitor with built-in metrics

### Railway
- View logs in Railway dashboard
- Set up monitoring alerts

### Vercel
- View frontend logs: Project Settings → Function Logs
- Check deployment status automatically

---

## Scaling Considerations

- **Database**: Use MongoDB Atlas M0 (free) for development, upgrade for production
- **Frontend**: Vercel/Netlify auto-scales
- **Backend**: Render/Railway free tier auto-sleeps; upgrade for always-on

---

## Disaster Recovery

1. **Database Backup**: Enable MongoDB Atlas automatic backups
2. **Code Repository**: Ensure GitHub is your source of truth
3. **Secrets Management**: Use platform's secret management (not in git)
4. **Rollback**: Git allows quick rollback to previous commits

---

Good luck with your deployment! 🚀
