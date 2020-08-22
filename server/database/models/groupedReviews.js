// import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewSchema = require("./reviews")

const GroupedReviewSchema = new Schema(
	{
		reviews: { type: [ReviewSchema], required: true },
		productID: { type: Schema.Types.ObjectId, required: true },
	},
	{ timestamps: true }
);

const GroupedReview = mongoose.model("GroupedReview", GroupedReviewSchema);

module.exports = GroupedReview;
