// import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	title: { type: String, min: 4, max: 100, required: true },
	description: { type: String, min: 8, max: 5000, required: true },
	imageURL: { type: String, min: 8, max: 100 },
	// image: {type: Image},
	createdAt: { type: Number, required: true },
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
