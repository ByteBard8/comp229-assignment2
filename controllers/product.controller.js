import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'



const create = async (req, res) => { 
    const product = new Product(req.body) 
    try {
        await product.save()
        return res.status(200).json({ 
        message: "Successfully added product!"
    })
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
    })
    } 
}

const list = async (req, res) => { 
    try {

        let products = await Product.find().select('name description price quantity category');
        if (req.query.name) {
            let pattern = req.query.name;
            pattern.toLowerCase();
            pattern = pattern.replace('[', '');
            pattern = pattern.replace(']', '');
            let filtered = products.filter(function (product) {
                return product.name.toLowerCase().includes(pattern)
            });
            res.json(filtered)
        } else {
            res.json(products)
        }
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
    })
    } 
}
    

const productByID = async (req, res, next, id) => { 
    try {
        let product = await Product.findById(id) 
        if (!product)
        return res.status('400').json({ 
        error: "product not found"
    })
    req.product = product 
    next()
    } catch (err) {
        return res.status('400').json({ 
        error: "Could not retrieve product"
    }) 
    }
}

const read = (req, res) => {
    return res.json(req.product) 
}
    
const update = async (req, res) => { 
    try {
        let product = req.product
        product = extend(product, req.body)
        let updated = await product.save()
        res.json(updated) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
    })
    } 
}
    
const remove = async (req, res) => { 
    try {
        let product = req.product
        let deletedproduct = await product.deleteOne()
        res.json(deletedproduct) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
    })
    } 
}

const deleteAll = async (req, res) => { 
    try {
        let products = await Product.deleteMany()
        res.json(products) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
    })
    } 
}
    
export default { create, productByID, read, list, remove, update, deleteAll }