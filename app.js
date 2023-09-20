const express = require('express');
const bodyParser = require('body-parser')
const productController = require('./controllers/ProductController');
const app = express();
const port = 3000;
global.FAKE_DB = require('./fakedb')
class BusinessError extends Error {
    constructor(message) {
        super(message);
        this.name = "BusinessError";
    }
}

global.BusinessError = BusinessError;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**************************************
 * MIDDLEWARES EXECUTED BEFORE QUERY  *
 **************************************/

// Middleware de logging
app.use((req , res , next) => {
    console.log(new Date() ,req.method , req.path);
    next()
})


/**********
 * ROUTES *
 **********/

// List products
app.get('/product', (req, res) => {
    if (productController.list) {
        productController.list(req, res);
    }else{
        throw new Error("Not implemented")
    }
});

// Get product details
app.get('/product/:id', (req, res) => {
    if (productController.get) {
        productController.get(req, res);
    }else{
        throw new Error("Not implemented")
    }
});

// Delete product
app.delete('/product/:id', (req, res) => {
    if (productController.delete) {
        productController.delete(req, res);
    }else{
        throw new Error("Not implemented")
    }
});

// Create product
app.post('/product', (req, res) => {
    if (productController.create) {
        productController.create(req, res);
    }else{
        throw new Error("Not implemented")
    }
});

// Update product
app.put('/product/:id', (req, res) => {
    if (productController.update) {
        productController.update(req, res);
    }else{
        throw new Error("Not implemented")
    }
});


/**************************************
 * MIDDLEWARES EXECUTED AFTER QUERY   *
 **************************************/



console.log("Registered routes : ");
for (let s of app._router.stack){
    if (s.route){
        console.log(Object.keys(s.route.methods).join(",").toUpperCase() + " " +s.route.path);
    }
}


app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
});

