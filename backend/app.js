const express = require('express')
const cors = require('cors')
const app = express();
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


//Open to be able to run frontend
app.use(express.static(path.join(__dirname + '/public')))
app.use('/api/products', require('./controllers/productsController'))
app.use('/api/users', require('./controllers/userController'))
app.use('/api/cart', require('./controllers/cartController'))
app.use('/api/comments', require('./controllers/commentsController'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


module.exports = app;
