import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting admin user seed...')

  // Create admin users
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  // Check if admins already exist
  const existingAdmins = await prisma.admin.findMany()
  
  if (existingAdmins.length === 0) {
    const admins = await Promise.all([
      prisma.admin.create({
        data: {
          email: 'admin@omoonibag.com',
          password: hashedPassword,
          firstName: 'Super',
          lastName: 'Admin',
          role: 'super_admin',
          permissions: [
            'products:view', 'products:create', 'products:update', 'products:delete',
            'orders:view', 'orders:update', 'orders:delete',
            'customers:view', 'customers:update', 'customers:delete',
            'content:view', 'content:create', 'content:update', 'content:delete',
            'analytics:view', 'reports:view',
            'settings:view', 'settings:update',
            'admins:view', 'admins:create', 'admins:update', 'admins:delete'
          ],
          isActive: true
        }
      }),
      prisma.admin.create({
        data: {
          email: 'manager@omoonibag.com',
          password: hashedPassword,
          firstName: 'Content',
          lastName: 'Manager',
          role: 'manager',
          permissions: [
            'products:view', 'products:create', 'products:update',
            'orders:view', 'orders:update',
            'customers:view',
            'content:view', 'content:create', 'content:update',
            'analytics:view'
          ],
          isActive: true
        }
      })
    ])
    console.log(`✅ Created ${admins.length} admin users`)
    console.log('📧 Admin credentials:')
    console.log('   Super Admin: admin@omoonibag.com / admin123')
    console.log('   Manager: manager@omoonibag.com / admin123')
  } else {
    console.log(`✅ Admin users already exist (${existingAdmins.length} found)`)
    console.log('📧 Existing admin credentials:')
    existingAdmins.forEach(admin => {
      console.log(`   ${admin.role}: ${admin.email} / admin123`)
    })
  }

  console.log('🎉 Admin user seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during admin seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })





