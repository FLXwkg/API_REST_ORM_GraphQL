const ProductService = require("../services/ProductService");
const express = require('express')
const router = express.Router()

/**
 * List products
 */
router.get('/', async (req, res) => {
    let products = await ProductService.listProducts({ ...req.query });
    res.json(products);
})

router.post('/:id', async (req, res) => {
    let id = req.params.id;
    let products = await ProductService.createProduct(id);
    res.json(products);
})

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let params = req.body
    let products = await ProductService.updateProduct(id, params);
    res.json(products);
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let products = await ProductService.deleteProduct(id);
    res.json(products);
})

module.exports = router