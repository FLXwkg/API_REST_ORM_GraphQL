const ProductDAO = require("../dao/ProductDAO");

module.exports = {
    
    async listProducts(sort , order , filters , limit , page){
        return await ProductDAO.listProducts(sort , order , filters , limit , page);
    },

    async createProduct(params){
        return await ProductDAO.createProduct(params);
    },

    async getProduct(id){
        return await ProductDAO.getProduct(id); 
    },

    async updateProduct(id , params){
        return await ProductDAO.updateProduct(id , params);
    },
    async deleteProduct(id){
        return await ProductDAO.deleteProduct(id);
    }


}
