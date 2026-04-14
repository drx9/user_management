const express = require('express');
const { body } = require('express-validator');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all users - Admin and Manager can see all, Users see only themselves
router.get('/', (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'manager') {
    next();
  } else {
    // Regular users get their own profile
    req.query.userId = req.user.id;
    next();
  }
}, getAllUsers);

// Get single user by ID
router.get('/:id', getUserById);

// Create user - Admin only
router.post(
  '/',
  authorize('admin'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('role').isIn(['user', 'manager', 'admin']).withMessage('Invalid role'),
    body('status').isIn(['active', 'inactive']).withMessage('Invalid status'),
  ],
  createUser
);

// Update user
router.put(
  '/:id',
  [
    body('name').trim().optional(),
    body('email').isEmail().optional().withMessage('Valid email is required'),
    body('role').optional().isIn(['user', 'manager', 'admin']).withMessage('Invalid role'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
  ],
  updateUser
);

// Delete (soft delete/deactivate) user - Admin only
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
