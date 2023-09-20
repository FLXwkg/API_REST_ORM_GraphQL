const productService = require('../services/ProductService');

module.exports = {

    list(req ,  res){
        let products = ProductService.getProducts(req.params);
        res.json({products})
    },

    create(req , res){
    },

    update(req , res){
    },

    delete(req , res){
    }
}
