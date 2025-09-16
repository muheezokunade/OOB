#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 OmoOniBag Production Setup');
console.log('==============================\n');

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function generateJWTSecret() {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

async function setupProduction() {
  try {
    console.log('📋 This script will help you set up your production environment.\n');
    console.log('You will need:');
    console.log('1. Supabase database credentials');
    console.log('2. Cloudinary account credentials\n');
    
    const proceed = await askQuestion('Do you have both accounts ready? (y/n): ');
    if (proceed.toLowerCase() !== 'y') {
      console.log('\n📝 Please set up your accounts first:');
      console.log('- Database: https://supabase.com');
      console.log('- Cloudinary: https://cloudinary.com');
      console.log('\nThen run this script again.');
      rl.close();
      return;
    }
    
    console.log('\n🗄️  DATABASE SETUP');
    console.log('==================');
    
    const projectRef = await askQuestion('Enter your Supabase project reference: ');
    const dbPassword = await askQuestion('Enter your database password: ');
    const databaseUrl = `postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres`;
    
    console.log('\n☁️  CLOUDINARY SETUP');
    console.log('====================');
    
    const cloudName = await askQuestion('Enter your Cloudinary cloud name: ');
    const apiKey = await askQuestion('Enter your Cloudinary API key: ');
    const apiSecret = await askQuestion('Enter your Cloudinary API secret: ');
    
    const jwtSecret = await generateJWTSecret();
    
    console.log('\n🔧 Setting up database...\n');
    
    // Set environment variables
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
    
    console.log('\n📝 NETLIFY ENVIRONMENT VARIABLES');
    console.log('==================================');
    console.log('Copy these environment variables to your Netlify site:');
    console.log('(Go to: https://app.netlify.com/projects/classy-monstera-9dcad4/settings/deploys#environment-variables)\n');
    
    console.log('DATABASE_URL=' + databaseUrl);
    console.log('JWT_SECRET=' + jwtSecret);
    console.log('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=' + cloudName);
    console.log('CLOUDINARY_API_KEY=' + apiKey);
    console.log('CLOUDINARY_API_SECRET=' + apiSecret);
    console.log('NEXT_PUBLIC_APP_URL=https://classy-monstera-9dcad4.netlify.app');
    
    console.log('\n🔄 NEXT STEPS');
    console.log('==============');
    console.log('1. Add the environment variables above to Netlify');
    console.log('2. Redeploy your site (or push a new commit)');
    console.log('3. Test your live site: https://classy-monstera-9dcad4.netlify.app');
    console.log('4. Test admin login and image uploads');
    
    console.log('\n🎉 Setup complete! Your luxury fashion platform is ready for production!');
    
  } catch (error) {
    console.error('\n❌ Error during setup:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('- Make sure your Supabase project is active');
    console.log('- Verify your credentials are correct');
    console.log('- Check your internet connection');
  } finally {
    rl.close();
  }
}

setupProduction();



