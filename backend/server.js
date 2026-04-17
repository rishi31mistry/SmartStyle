const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { connectToDatabase, createApp } = require('./app');

const app = createApp();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

if (require.main === module) {
  connectToDatabase()
    .then(() => {
      console.log('MongoDB connected');
      app.listen(PORT, HOST, () =>
        console.log(`Server running on http://${HOST}:${PORT}`)
      );
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = app;
