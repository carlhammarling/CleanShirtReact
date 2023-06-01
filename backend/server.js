const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

PORT = process.env.PORT
MONGO_URI = process.env.MONGO_URI

app.listen(PORT, () => console.log('http://localhost:' + PORT))

mongoose.connect(MONGO_URI)
    .then(console.log('connected to DB'))
    .catch((err) => console.log(err.message))


