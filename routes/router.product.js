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
<<<<<<< HEAD
    let products = await ProductService.listProducts(req.query.sort , req.query.order , req.query.filters , req.query.limit , req.query.page);
=======
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
>>>>>>> 442546da71c5005e54e372913ddfbb5689ac80d7
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