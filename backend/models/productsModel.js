const Product = require('../schemas/productSchema')



//CRUD

//CREATE / POST

exports.postProduct = (req, res) => {
    const { name, description, price, imgURL, category } = req.body

    if( !name || !description || !price || !imgURL ) {
        return res.status(400).json({
            message: 'You have to enter all the feilds.'
        })
    }

    Product.create({ name, description, price, imgURL, category })
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ 
            message: 'Something went wrong while creating the product'
        }))
}



//READ / GET All

exports.getAllProducts = (req, res) => {
    Product.find()
        .then(data => res.status(200).json(data))
        .catch(() => res.status(404).json({
            message: 'Could not get the products'
        }))
}



//GET One
exports.getOneProduct = (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .populate('comments')
        .populate({
            path: 'comments',
            populate: { path: 'userId', select: 'firstName lastName'}
        })
        .exec()
        .then(data => {
            if(!data) {
                return res.status(404).json({ message: 'Could not find any product with this id.' })
            }
            res.status(201).json(data)
            })          
        .catch(() => res.status(404).json({
            message: 'Something went wrong while getting the product.'
        }))
}



//PUT
exports.putProduct = (req, res) => {
    const { name, description, price, imgURL, category } = req.body
    const id = req.params.id

    Product.findByIdAndUpdate(id, { name, description, price, imgURL, category }, { new: true })
        .then(data => {
            if(!data) {
                return res.status(404).json({ message: 'Could not find any product with this id' })
            }
            res.status(201).json(data)
            })
        .catch(() => ({
            message: 'Somthing went wrong while trying to update the product'
        }))
}


//DELTE

exports.deleteProduct = (req, res) => {
    const id = req.params.id

    Product.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                return res.status(404).json({ message: 'Could not find any product with this id.' })
            }
            res.status(200).json({ message: 'Product with id: ' + id + ' was succefully deleted.'})
            })
        .catch(() => res.status(400).json({ message: 'Could not delete the product.'}))

}