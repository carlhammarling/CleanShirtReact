const router = require('express').Router()
const userModel = require('../models/userModel')
const { verifyToken, checkAdmin } = require('../authorization/auth')

//POST
router.post('/register', userModel.postUser)
router.post('/login', userModel.loginUser)

//GET
router.get('/', userModel.getAllUsers)

//important to keep this above id
router.get('/bytoken', verifyToken, userModel.getUserByToken)
router.get('/:id', userModel.getOneUser)

//Patch
router.patch('/update', verifyToken, userModel.updateUser)

//DELETE - Delete a user - only accessable for admin.
router.delete('/:id', verifyToken, checkAdmin ,userModel.deleteUser)






module.exports = router;




