// Importing express
const express = require("express");
// Importing the router
const router = express.Router();
// importing schema for project objects
const Review = require("../database/models/reviews");

// GET api/<YOUR-DATA-TYPE>
// GET api/<YOUR-DATA-TYPE>/:id
// POST api/<YOUR-DATA-TYPE>
// PUT api/<YOUR-DATA-TYPE>/:id
// DELETE api/<YOUR-DATA-TYPE>/:id

router
	.get("/post/:productID", (async (req, res, next) => {
        const {productID} = req.params
		await Review.find({productID})
			.then(allDocuments => res.json(allDocuments))
			.catch(err => next(new Error(err)))
	}))	
	.get("/review/:reviewID", (async (req, res, next) => {
		// Taking id out of params by destructuring
		const {reviewID} = req.params
		// findOne instead of one stops searching after the first matching item is found, improving search times
		// const result = await Review.findOne({_id:id});
		// findById to specifically search for object by unique ID
        await Review.findById(reviewID)
            .then(result => res.json(result))
            .catch(err => next(new Error(err)))
	}))
	.post("/:productID", (async (req, res, next) => {
        const {productID} = req.params
        const doc = {...req.body, productID, createdAt: Date.now()}
        await Review.create(doc)
            .then(newDocument => res.json(newDocument))
            .catch(err => next(new Error(err)))
    }))	
	.put("/:reviewID", (async(req, res, next) => {
        const {reviewID} = req.params        
        await Review.findByIdAndUpdate(reviewID, { ...req.body }, {new:true, useFindAndModify:false})
            .then(updatedDocument => res.json(updatedDocument))
            .catch(err => next(new Error(err)))
	}))
		
	.delete("/:reviewID", (async (req, res, next) => {
        const {reviewID} = req.params
        await Review.findByIdAndDelete(reviewID, {useFindAndModify:false})
            .then(response => res.json(response))
            .catch(err => next(new Error(err)))
    }))

module.exports = router;
