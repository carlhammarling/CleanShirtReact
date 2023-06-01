const Comment = require('../schemas/commentSchema')
const Product = require('../schemas/productSchema')


//CRUD

exports.createComment = (req, res) => {
    const { productId, rating, comment } = req.body
    const userId = req.userId

    if( !productId || !rating || !comment ) {
        return res.status(400).json({ message: 'You have to fill in all the forms to make a review.'})
    }

    Comment.create({ productId, rating, comment, userId })
        .then(data => {
            Product.findByIdAndUpdate(productId, { $push: { comments: data._id }}, { new: true })
            .then(comment => res.status(201).json(comment))
            .catch(() => res.status(400).json({ message: 'Something went wrong when trying to post review to product.'}))
        })
        .catch(() => res.status(400).json({ message: 'Something went wrong when trying to post a review.' }))            
}