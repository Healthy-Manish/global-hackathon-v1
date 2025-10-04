const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Setting up Memory Keeper Application...\n');

// Create necessary directories
const directories = [
  'backend/uploads',
  'backend/database',
  'frontend/src/components'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('\n📦 Installing dependencies...\n');

try {
  // Install root dependencies
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Install backend dependencies
  console.log('\nInstalling backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'inherit' });
  
  // Install frontend dependencies
  console.log('\nInstalling frontend dependencies...');
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  
  console.log('\n🎉 All dependencies installed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Make sure you have a Hugging Face token in backend/.env');
  console.log('2. Run: npm run dev');
  console.log('3. Open http://localhost:3000 in your browser');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
}