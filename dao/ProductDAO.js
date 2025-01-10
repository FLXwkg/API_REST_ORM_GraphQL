module.exports = {

<<<<<<< HEAD
    async listProducts(sort , order, filters = {} , limit = 100 , page = 1){
        let findQuery = {};
        page = Number(page)
        limit = Number(limit)
        if(filters.name){
            findQuery.name =  RegExp(filters.name , "gi")
        }
        if(filters.description){
           findQuery.description = RegExp(filters.description , "gi")
        }
        if (filters.price){
            findQuery.price = {$lte : filters.price}
        }

        let sortQuery = {[sort]  : order == 'DESC' ? -1 : 1  };
        let count =  await Product.count(findQuery); 
        let items =  await Product.find(findQuery).sort(sortQuery).skip((page-1) * limit).limit(Number(limit));
        console.log(items);
        return {
            total : count,
            items : items,
            page : page,
            limit :  limit
        }
    },

    async createProduct(params = {}){
        return await Product.create(params);
=======
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
>>>>>>> 442546da71c5005e54e372913ddfbb5689ac80d7
    },

    async getProduct(id){
        return await Product.findById(id);
    },

    async updateProduct(id , params){
        return await Product.findByIdAndUpdate(id , params , {returnOriginal: false});
    },

    async deleteProduct(id){
        return await Product.findByIdAndDelete(id);
    }

}
