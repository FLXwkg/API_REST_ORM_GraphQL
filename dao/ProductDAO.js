module.exports = {

    async listProducts(params){
        const { sort, order, filters } = params;

        const query = {};
        if (filters) {
            // Add quotes to keys and values in the format `{name: r}`
            const fixedFilters = filters.replace(/(\w+):\s*([\w]+)/g, '"$1":"$2"');
    
            try {
                const parsedFilters = JSON.parse(fixedFilters);
                for (const [key, value] of Object.entries(parsedFilters)) {
                    query[key] = { $regex: value, $options: 'i' }; // Case-insensitive partial match
                }
            } catch (error) {
                console.error("Invalid filter format:", error);
                throw new Error("Invalid format in filters parameter");
            }
        }

        const sortOrder = order === 'ASC' ? 1 : -1;

        const sortOption = { [sort]: sortOrder };
        
        return await Product.find(query).sort(sortOption);
    },

    createProduct(params){
        return Product.createProduct();
    },

    updateProduct(id , params){
    },

    deleteProduct(id){
    }

}
