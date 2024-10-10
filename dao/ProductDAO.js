module.exports = {

    async listProducts(params){
        return await Product.find();
    },

    createProduct(params){
    },

    updateProduct(id , params){
    },

    deleteProduct(id){
    }

}
