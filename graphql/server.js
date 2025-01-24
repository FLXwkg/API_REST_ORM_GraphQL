const { buildSchema } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const express = require('express');
const mongoose = require('mongoose');
const {schemas, resolvers} = require('./schema.js')

mongoose.connect('mongodb+srv://ewenheas13:2VpjH0XUpRw7OSSE@cluster0.1hhqk.mongodb.net/mds_tp_training_api');

global.mongoose = mongoose;

const app = express();

app.use((req , res , next) => {
  console.log(new Date() ,req.method , req.path);
  next()
})
 
// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema: schemas,
    rootValue: resolvers,
  }),
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
 
// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');