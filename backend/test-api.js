// backend/test-api.js
const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🔄 Testing API endpoints...');
    
    // Test health check
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const health = await healthResponse.json();
    console.log('✅ Health check:', health);
    
    // Register a test student
    const studentData = {
      name: 'Test Student',
      email: 'student@test.com',
      password: 'password123',
      role: 'student',
      location: 'New York'
    };
    
    console.log('\n🔄 Registering test student...');
    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    const register = await registerResponse.json();
    
    if (register.success) {
      console.log('✅ Student registered:', register.user.email);
      console.log('🔑 Token:', register.token);
    } else {
      console.log('⚠️ Student registration:', register.message);
    }
    
    // Register a test recruiter
    const recruiterData = {
      name: 'Test Recruiter',
      email: 'recruiter@test.com',
      password: 'password123',
      role: 'recruiter',
      company: 'Tech Corp',
      location: 'San Francisco'
    };
    
    console.log('\n🔄 Registering test recruiter...');
    const recruiterResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recruiterData)
    });
    const recruiter = await recruiterResponse.json();
    
    if (recruiter.success) {
      console.log('✅ Recruiter registered:', recruiter.user.email);
      console.log('🔑 Token:', recruiter.token);
    } else {
      console.log('⚠️ Recruiter registration:', recruiter.message);
    }
    
    // Test login with student
    console.log('\n🔄 Logging in as student...');
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@test.com',
        password: 'password123'
      })
    });
    const login = await loginResponse.json();
    
    if (login.success) {
      console.log('✅ Student login successful:', login.user.email);
      console.log('🔑 Token:', login.token);
    } else {
      console.log('❌ Student login failed:', login.message);
    }
    
    console.log('\n🎉 API test completed!');
    console.log('\n📝 You can now login with:');
    console.log('   Student: student@test.com / password123');
    console.log('   Recruiter: recruiter@test.com / password123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure the backend is running: npm run dev');
  }
}

testAPI();