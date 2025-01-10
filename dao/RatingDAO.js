module.exports = {

    async listRatings(id){
        return await Rating.find({product : id});
    },

    async createRating(id, params = {}){
        params.product = id
        return await Rating.create(params);
    }

}
