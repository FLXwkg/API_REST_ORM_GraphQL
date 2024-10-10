const ProductService = require("../services/ProductService");
const express = require('express')
const router = express.Router()

/**
 * List products
 */
router.get('/', async (req, res) => {
    let products = await ProductService.listProducts();
    res.json(products);
})

module.exports = router