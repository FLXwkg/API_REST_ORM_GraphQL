const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const userRoutes = require('./routes/router.user');
const productRoutes = require('./routes/router.product');
const userRoutes = require('./routes/router.user');
const productModel = require('./models/model.product');
const userModel = require('./models/model.user');
mongoose.connect('mongodb+srv://ewenheas13:2VpjH0XUpRw7OSSE@cluster0.1hhqk.mongodb.net/mds_tp_training_api');

global.mongoose = mongoose;
/**
 * Mongoose models definition
 */
global.User = userModel;
global.Product = productModel;

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
// Moddle 
app.use((req , res , next) => {
    req.query = Object.entries(req.query).reduce((r, [k, v]) => {
        k.split('.').reduce((a, e, i, ar) => {
          return a[e] || (a[e] = ar[i + 1] ? {} : v)
        }, r)
        return r;
      }, {});
    next();
})

/**********
 * ROUTES *
 **********/
app.use("/product" ,productRoutes);
app.use("/user" ,userRoutes);


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

