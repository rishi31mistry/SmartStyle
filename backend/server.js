const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

if (!process.env.MONGO_URI) {
  console.error(`Missing MONGO_URI in ${path.join(__dirname, '.env')}`);
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/products', require('./routes/product'));
app.use('/api/moodyproducts', require('./routes/moodyproduct'));
app.use('/api/cart', require('./routes/cart'));


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, HOST, () =>
      console.log(`Server running on http://${HOST}:${PORT}`)
    );
  })
  .catch(err => console.log(err));
