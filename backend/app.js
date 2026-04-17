const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

let connectionPromise = null;

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/admin', require('./routes/admin'));
  app.use('/api/user', require('./routes/user'));
  app.use('/api/wishlist', require('./routes/wishlist'));
  app.use('/api/products', require('./routes/product'));
  app.use('/api/moodyproducts', require('./routes/moodyproduct'));
  app.use('/api/cart', require('./routes/cart'));
  app.use('/api/payment', require('./routes/payment'));
  app.use('/api/notifications', require('./routes/notifications'));

  return app;
}

async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error(`Missing MONGO_URI in ${path.join(__dirname, '.env')}`);
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI);
  }

  try {
    await connectionPromise;
    return mongoose.connection;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  createApp,
};
