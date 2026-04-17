require('dotenv').config();

const app = require('../backend/server');
const { connectToDatabase } = require('../backend/app');

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Vercel API bootstrap failed:', error);
    return res.status(500).json({
      message: 'Unable to connect to the server',
    });
  }
};
