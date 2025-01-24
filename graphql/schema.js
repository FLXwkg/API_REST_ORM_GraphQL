const { buildSchema } = require('graphql');
const Product = require('../models/model.product');

// Schéma GraphQL pour les produits
const schemas = buildSchema(`
  type Produit {
    id: ID!
    name: String!
    description: String!
    creation_date: String
    update_date: String
    price: Float!
  }

  type Query {
    getProduit(id: ID!): Produit
    listProduits: [Produit]
  }
`);

// Résolveurs pour les produits
const resolvers = {
  async getProduit({ id }) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw new Error('Produit introuvable');
    }
  },

  async listProduits() {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error('Erreur lors de la récupération des produits');
    }
  },
};

module.exports = {
  schemas,
  resolvers,
};
