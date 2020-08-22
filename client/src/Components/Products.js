import React, { useContext } from "react";
import "../Table.css";
import Product from "./Product";
import { AppContext } from "../Context/AppContext";

const Products = () => {	
	const { list, loading } = useContext(AppContext);

	const renderData = (data) => {
		return (
			<table id="table">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Description</th>
						<th>Image location</th>
						<th>Edit / Delete</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<Product key={item._id} {...item} />
					))}
				</tbody>
			</table>
		);
	};

	return (
		<>
			{loading ? (
				"loading..."
			) : 
			list ? (
				<>
					<h2>{list.length} Products</h2>
					{renderData(list)}
				</>
			) : (
				"Something went wrong"
			)}
		</>
	);
};

export default Products;
