const express = require('express')
const RatingService = require("../services/RatingService");

const router = express.Router()

/**
 * List products
 */
router.get('/product/:id/rating', async (req, res) => {
    let ratings = await RatingService.listRatings(req.params.id);
    res.json(ratings);
})

router.post("/product/:id/rating" , async (req , res) => {
    let rating = await RatingService.createRating(req.params.id, req.body);
    res.json(rating);
})

module.exports = router