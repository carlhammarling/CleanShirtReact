const express = require('express')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


//Open to be able to run frontend
app.use(express.static(__dirname + '/public'))
app.use('/api/products', require('./controllers/productsController'))
app.use('/api/users', require('./controllers/userController'))
app.use('/api/cart', require('./controllers/cartController'))
app.use('/api/comments', require('./controllers/commentsController'))


module.exports = app;
