const ProductDAO = require("../dao/ProductDAO");

module.exports = {
    
<<<<<<< HEAD
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

=======
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
>>>>>>> 442546da71c5005e54e372913ddfbb5689ac80d7

}
