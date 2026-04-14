require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create demo users
    const demoUsers = [
      {
        name: 'Admin User',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
      },
      {
        name: 'Manager User',
        email: 'manager@demo.com',
        password: 'manager123',
        role: 'manager',
        status: 'active',
      },
      {
        name: 'Regular User',
        email: 'user@demo.com',
        password: 'user123',
        role: 'user',
        status: 'active',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        status: 'active',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
        status: 'active',
      },
    ];

    // Insert users using save() so pre-save password hashing runs
    const createdUsers = [];
    for (const userData of demoUsers) {
      const user = new User(userData);
      createdUsers.push(await user.save());
    }
    console.log(`✓ Created ${createdUsers.length} demo users`);

    // Update createdBy for all users (except first one)
    for (let i = 1; i < createdUsers.length; i++) {
      await User.updateOne(
        { _id: createdUsers[i]._id },
        { createdBy: createdUsers[0]._id }
      );
    }
    console.log('✓ Set createdBy references');

    console.log('\n✓ Database seeded successfully!');
    console.log('\nDemo Credentials:');
    console.log('  Admin: admin@demo.com / admin123');
    console.log('  Manager: manager@demo.com / manager123');
    console.log('  User: user@demo.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
