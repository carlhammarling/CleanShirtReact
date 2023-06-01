const bcrypt = require('bcryptjs');
const Cart = require('../schemas/cartSchema');
const User = require('../schemas/userSchema');
const auth = require('../authorization/auth')


//CREATE / POST
exports.postCart = (req, res) => {
    console.log(req.userId)
    const { orderLine } = req.body

    //Hämtar id från token, man postar alltså till den man är inloggad på
    const userId = req.userId

    if(!orderLine ) {
        return res.status(400).json({
            message: 'You have to fill in all the forms'
        })        
    }
    

    Cart.create({ orderLine, userId })
    .then(data => {
        User.findByIdAndUpdate(userId, { $push: { shoppingCart: data._id }}, { new: true })
        .then(usercart => res.status(201).json(usercart))
        .catch(() => res.status(400).json({ message: 'Could not create order' }))
    })
    .catch(() => res.status(400).json({ message: 'Could not create order' }))
}


//GET - BY TOKEN
//Hämtar alla på den som är inloggad
exports.getUserCart = (req, res) => {
    const userId = req.userId

    Cart.find({ userId })
    .populate({
        path: 'orderLine.product',
        select: 'name price'
      })
      .populate({
        path: 'userId',
        select: 'email'
      })
    .exec()
    .then(data => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'Could not find any orders for this user' }))
}

 //jämför params med userId i ordern
exports.getCustomerCart = (req, res) => {
    const userId = req.params.id
   
    Cart.find({ userId })
    .populate({
        path: 'orderLine.product',
        select: 'name price'
      })
      .populate({
        path: 'userId',
        select: 'email'
      })
    .exec()
    .then(data => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'Could not find any orders for this user' }))
}

//GET - One by ID - fixa admin
exports.getOneOrder = (req, res) => {
    const id = req.params.id

    Cart.findById(id)
    .populate({
        path: 'orderLine.product userId',
        select: 'name price description email'
    })
    .exec()
    .then(data => res.status(200).json(data))
    .catch(() => res.status(404).json({ message: 'Could not find order.'}))
}


//Delete - med save på user

exports.deleteCart = async (req, res) => {
    const id = req.params.id

    try {
        const cart = await Cart.findById(id)
        if(!cart) {
            return res.status(404).json({ message: 'Could not find any cart with this id.' })
        }
        const userId = cart.userId
        await User.findByIdAndUpdate(userId, { $pull: { shoppingCart: id }}, { new: true })
        await Cart.findByIdAndDelete(id)
        res.status(200).json({ message: 'Cart with id:' + id + 'was removed from database and user with id + ' + userId})

        // await cart.remove()

    } catch {
        res.status(404).json({ message: 'Could not delete cart.'})
    }
}








