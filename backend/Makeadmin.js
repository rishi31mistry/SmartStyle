require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')

// ── Add every email that should be admin ──
const ADMIN_EMAILS = [
  'mistryrishi31052004@gmail.com',

  // add more here if needed
]

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to MongoDB')

  for (const email of ADMIN_EMAILS) {
    const user = await User.findOne({ email })

    if (!user) {
      console.log(`✗ No account found for: ${email} — they need to sign up first`)
      continue
    }

    if (user.role === 'admin') {
      console.log(`✓ Already admin: ${email}`)
      continue
    }

    user.role = 'admin'
    await user.save()
    console.log(`✅ Upgraded to admin: ${email}`)
  }

  console.log('\nDone. Now log out and log back in on the admin login page.')
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})