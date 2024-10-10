const ProductDAO = require('../dao/ProductDAO');

module.exports = {
    
    async listProducts(params){
        return await ProductDAO.listProducts();
    },


}
