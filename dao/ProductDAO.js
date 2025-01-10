module.exports = {

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
