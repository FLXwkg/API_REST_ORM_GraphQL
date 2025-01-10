const multer  = require('multer')
const express = require('express')
const path = require("path")
const fs = require("fs");
const ProductService = require("../services/ProductService");



const router = express.Router()
const storage = multer.diskStorage({
    destination: '.tmp/', 
    filename : (req, file , cbk) =>{
        cbk(null , req.params.id+".png");
    }
})
const upload = multer({
    storage : storage, 
    fileFilter : (req , file , cbk) => {
        if (file.mimetype == "image/png"){
            cbk(null , true);
        }else{
            cbk("Format invalide" , false);
        }
    }
});

/**
 * List products
 */
router.get('/', async (req, res) => {
    let products = await ProductService.listProducts(req.query.sort , req.query.order , req.query.filters , req.query.limit , req.query.page);
    res.json(products);
})

router.post("/" , async (req , res) => {
    let product = await ProductService.createProduct(req.body);
    res.json(product);
})

router.get("/:id" , async (req , res) => {
    let product = await ProductService.getProduct(req.params.id);
    res.json(product);
})

// PUT http://localhost:3000/product/10 
router.put("/:id" , async (req , res) => {
    let product = await ProductService.updateProduct(req.params.id , req.body);
    res.json(product);
})

router.delete("/:id" , async (req , res) => {
    let product = await ProductService.deleteProduct(req.params.id);
    res.json(product);
})

router.put("/:id/image" , upload.single('photo') , async (req , res)=>{
    console.log(req.file);
    res.end();
});

router.get("/:id/image" , async (req , res) => {
    const imagePath = path.join(".tmp" , req.params.id+".png");
    const filestream = fs.createReadStream(imagePath);
    res.setHeader('Content-type', "image/png");
    filestream.pipe(res);
});

module.exports = router