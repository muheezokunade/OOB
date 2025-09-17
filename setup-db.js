#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🗄️  OmoOniBag Database Setup');
console.log('============================\n');

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupDatabase() {
  try {
    console.log('📋 Please provide your Supabase database details:\n');
    
    const projectRef = await askQuestion('Enter your Supabase project reference (from the URL): ');
    const password = await askQuestion('Enter your database password: ');
    
    const databaseUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
    
    console.log('\n🔧 Setting up database...\n');
    
    // Set environment variable for this session
    process.env.DATABASE_URL = databaseUrl;
    
    // Generate Prisma client
    console.log('1. Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Run migrations
    console.log('\n2. Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
    // Seed the database
    console.log('\n3. Seeding database with sample data...');
    execSync('npx prisma db seed', { stdio: 'inherit' });
    
    console.log('\n✅ Database setup complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Copy this DATABASE_URL to your Netlify environment variables:');
    console.log(`   DATABASE_URL=${databaseUrl}`);
    console.log('\n2. Add a JWT_SECRET to Netlify:');
    console.log('   JWT_SECRET=your-super-secure-jwt-secret-key-here-min-32-characters');
    console.log('\n3. Redeploy your Netlify site to apply the changes');
    
  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('- Make sure your Supabase project is active');
    console.log('- Verify your project reference and password are correct');
    console.log('- Check that your internet connection is stable');
  } finally {
    rl.close();
  }
}

setupDatabase();




