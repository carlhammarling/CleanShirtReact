const router = require('express').Router()
const productsModel = require('../models/productsModel')
const auth = require('../authorization/auth')


//POST
router.post('/', auth.verifyToken, auth.checkAdmin, productsModel.postProduct)

//GET - All products
router.get('/', productsModel.getAllProducts)
//Get one product by ID
router.get('/:id', productsModel.getOneProduct)

//PUT - Update product, only accessable for admin.
router.put('/:id', auth.verifyToken, auth.checkAdmin, productsModel.putProduct)

//DELETE - Delete product, only accessable for admin.
router.delete('/:id', auth.verifyToken, auth.checkAdmin, productsModel.deleteProduct)


module.exports = router;