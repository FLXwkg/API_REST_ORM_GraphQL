const ProductDAO = require('../dao/ProductDAO');

module.exports = {
    
    async listProducts(params){
        return await ProductDAO.listProducts(params);
    },

    async createProduct(params){
        return ProductDAO.createProduct(params);
    },

    async updateProduct(id, params){
        return ProductDAO.updateProduct(id, params);
    },

    async deleteProduct(params){
        return ProductDAO.deleteProduct(params);
    },

}
