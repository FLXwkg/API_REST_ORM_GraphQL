const RatingDAO = require("../dao/RatingDAO");

module.exports = {
    
    async listRatings(id){
        return await RatingDAO.listRatings(id);
    },

    async createRating(id, params){
        return await RatingDAO.createRating(id, params);
    }

}
