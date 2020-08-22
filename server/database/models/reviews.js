// import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
	{
		title: { type: String, min: 4, max: 100, required: true },
		content: { type: String, min: 8, max: 5000, required: true },
		author: { type: String, min: 4, max: 100, required: true },
	},
	{ timestamps: true }
);

module.exports = ReviewSchema
