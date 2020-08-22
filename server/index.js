// Importing express
const express = require("express");
// declaring router
const productsRouter = require("./routes/products");
// const reviewsRouter = require("./routes/reviews");
const groupedReviewsRouter = require("./routes/groupedReviews");
// Importing cors
const cors = require("cors");
// import env file
require("dotenv").config();
// connect to database
require("./database/client");

// Initializing express as "app"
const app = express();
// return data from express as json
app.use(express.json());
// use cors
app.use(cors());
// use the routers, these are the paths for all the different routers
app.use("/api/products", productsRouter);
// app.use("/api/reviews", reviewsRouter);
app.use("/api/groupedReviews", groupedReviewsRouter);
// error middleware, any next function passed an error will find this if there is an error
app.use((err, req, res, next) => {
	console.error(err.message)
	res.send(`An error has ocurred: ${err.message}`)
})
// express listening to node to keep it awake or listening. this is necessary for an api to keep it running at all times
app.listen(process.env.PORT, () =>
	console.log("CORS-enabled web server listening on port " + process.env.PORT)
);

// add basic error handling to API
// make the routes of our second list ("reviews")
// in react application include a view to CRUED second list