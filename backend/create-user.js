// backend/create-user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const user = await User.create({
      name: 'Recruiter Test',
      email: 'recruiter@test.com',
      password: 'password123',
      role: 'recruiter',
      company: 'Test Company',
      location: 'New York'
    });
    
    console.log('✅ User created:', user.email);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createUser();