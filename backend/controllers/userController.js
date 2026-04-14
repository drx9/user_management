const User = require('../models/User');
const { generatePassword } = require('../utils/tokenUtils');
const { validationResult } = require('express-validator');

// Get all users with pagination and filters
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};

    // Add role filter
    if (role && role !== 'all') {
      filter.role = role;
    }

    // Add status filter
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Add search filter (search by name or email)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new user (Admin only)
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, status } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate password if not provided
    const userPassword = password || generatePassword();

    user = new User({
      name,
      email,
      password: userPassword,
      role: role || 'user',
      status: status || 'active',
      createdBy: req.user.id,
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        password: password ? undefined : userPassword, // Return generated password only if auto-generated
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, email, password, role, status } = req.body;
    const currentUser = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Regular users can only update their own profile (name and password, not role)
    if (currentUser.role === 'user' && currentUser.id !== id) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    // Regular users cannot change role
    if (currentUser.role === 'user' && role && role !== user.role) {
      return res.status(403).json({ message: 'You cannot change your role' });
    }

    // Managers can only update non-admin users
    if (currentUser.role === 'manager' && user.role === 'admin') {
      return res.status(403).json({ message: 'Managers cannot update admin users' });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Will be hashed by pre-save hook
    if (role && currentUser.role === 'admin') user.role = role;
    if (status && currentUser.role === 'admin') user.status = status;

    user.updatedBy = currentUser.id;

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete / deactivate user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Manager can only delete non-admin users
    if (req.user.role === 'manager' && user.role === 'admin') {
      return res.status(403).json({ message: 'Managers cannot delete admin users' });
    }

    user.status = 'inactive';
    user.updatedBy = req.user.id;

    await user.save();

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
