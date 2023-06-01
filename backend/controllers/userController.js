const router = require('express').Router()
const userModel = require('../models/userModel')
const { verifyToken, checkAdmin } = require('../authorization/auth')

//POST
router.post('/add', userModel.postUser)
router.post('/login', userModel.loginUser)

//GET
router.get('/', userModel.getAllUsers)
router.get('/:id', userModel.getOneUser)

//DELETE - Delete a user - only accessable for admin.
router.delete('/:id', verifyToken, checkAdmin ,userModel.deleteUser)






module.exports = router;




