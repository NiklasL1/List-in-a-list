// Importing express
const express = require("express");
const mongoose = require("mongoose");
// Importing the router
const router = express.Router();
// importing schema for project objects
const GroupedReview = require("../database/models/groupedReviews");

// GET api/<YOUR-DATA-TYPE>
// GET api/<YOUR-DATA-TYPE>/:id
// POST api/<YOUR-DATA-TYPE>
// PUT api/<YOUR-DATA-TYPE>/:id
// DELETE api/<YOUR-DATA-TYPE>/:id

router
	.get("/byProduct/:productID", async (req, res, next) => {
		const { productID } = req.params;
		await GroupedReview.find({ productID })
			.then((allDocuments) => res.json(allDocuments))
			.catch((err) => next(new Error(err)));
	})
	.get("/byReview/:reviewID", async (req, res, next) => {
		// Taking id out of params by destructuring
		const { reviewID } = req.params;
		// findOne instead of one stops searching after the first matching item is found, improving search times
		// const result = await Review.findOne({_id:id});
		// findById to specifically search for object by unique ID
		await GroupedReview.findById(reviewID)
			.then((result) => res.json(result))
			.catch((err) => next(new Error(err)));
	})	

	.post("/:productID", async (req, res, next) => {
		const { productID } = req.params;
		//pushing the product id into every element is redundant since it's already in the top level grouped object, but might be useful for other functionality
		const newReview = { ...req.body};
		GroupedReview.findOneAndUpdate(
			{ productID },
			{ $push: { reviews: newReview } },
			{ upsert: true, new: true }
		)
			.then((response) => res.json(response))
			.catch((err) => next(new Error(err)));
	})

	.put("/:reviewID", async (req, res, next) => {
		const { reviewID } = req.params;
		await GroupedReview.findByIdAndUpdate(
			reviewID,
			{ ...req.body },
			{ new: true, useFindAndModify: false }
		)
			.then((updatedDocument) => res.json(updatedDocument))
			.catch((err) => next(new Error(err)));
	})

	.delete("/:reviewID", async (req, res, next) => {
		const { reviewID } = req.params;
		await GroupedReview.findByIdAndDelete(reviewID, { useFindAndModify: false })
			.then((response) => res.json(response))
			.catch((err) => next(new Error(err)));
	});

module.exports = router;
