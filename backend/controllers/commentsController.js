const router = require('express').Router()
const commentModel = require('../models/commentModel')
const auth = require('../authorization/auth')

//POST - Posts a comment/review connected to product.  
router.post('/', auth.verifyToken, commentModel.createComment)



module.exports = router;