const express = require('express');
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();
require('express-async-errors')
const port = 3000;
const mongoose = require('mongoose');
const userRoutes = require('./routes/router.user');
const productRoutes = require('./routes/router.product');
const ratingRoutes = require('./routes/router.rating');
const authRoutes = require('./routes/router.auth');
const productModel = require('./models/model.product');
const ratingModel = require('./models/model.rating');
const userModel = require('./models/model.user');
const SecurityService = require('./services/SecurityService');
const policies = require("./roles.config")
mongoose.connect('mongodb+srv://ewenheas13:2VpjH0XUpRw7OSSE@cluster0.1hhqk.mongodb.net/mds_tp_training_api');

global.mongoose = mongoose;
/**
 * Mongoose models definition
 */
global.User = userModel;
global.Product = productModel;
global.Rating = ratingModel;

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
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
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

// Auth
app.use(/\/((?!login).)*/, (req , res , next) => {
    let token = req.headers['authorization'] || '';

    SecurityService.verifyToken(token.split(" ")[1] , (err, user) => {
        if (err){
            return res.status(401).send("Unauthorized");
        }else{
            req.user = user
            next();
        }
    });
});

app.use(/\/((?!login).)*/, (req , res , next) => {
    let rolePolicy = policies[req.user.role] || [];
    let matchingPolicy = rolePolicy.find((p) => {
        return req.method == p.method && p.url.test(req._parsedUrl.path)
    });
    if(matchingPolicy == null){
        return res.status(403).send('Forbidden')
    }
    next();
});


/**********
 * ROUTES *
 **********/
app.use("/", authRoutes)
app.use("/product" ,productRoutes);
app.use("/" ,ratingRoutes);
app.use("/user" ,userRoutes);


/**************************************
 * MIDDLEWARES EXECUTED AFTER QUERY   *
 **************************************/
app.use((err, req, res, next) => {
    if(err.constructor.name == 'ValidationError'){
        res.status(400).send('Invalid format : ' + err.message)
    } else {
        res.status(500).send("An error occured : " + err.message)
    }
    
})

console.log("Registered routes : ");
for (let s of app._router.stack){
    if (s.route){
        console.log(Object.keys(s.route.methods).join(",").toUpperCase() + " " +s.route.path);
    }
}


app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
});

