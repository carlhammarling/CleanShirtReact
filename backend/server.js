const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log('Server listening on http://localhost:' + PORT);
    });
  })
  .catch((err) => console.log(err.message));
