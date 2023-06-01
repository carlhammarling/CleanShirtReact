const router = require('express').Router()
const cartModel = require('../models/cartModel')
const auth = require('../authorization/auth')

//POST - Post to cart to the user that is logged in.
router.post('/', auth.verifyToken, cartModel.postCart)

//GET 
//- Gets orders connected to the user that is logged in.
router.get('/', auth.verifyToken, cartModel.getUserCart)

//Get order from order nr, only accessable for admin.
router.get('/:id', auth.verifyToken, auth.checkAdmin ,cartModel.getOneOrder)

//Gets orders connected to any user id - only accessable for admin.
router.get('/customer/:id', auth.verifyToken, auth.checkAdmin, cartModel.getCustomerCart)

//Delete any order by order-id , only accessable for admin.
router.delete('/:id', auth.verifyToken, auth.checkAdmin ,cartModel.deleteCart)







module.exports = router;




