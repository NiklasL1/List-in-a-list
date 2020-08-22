import React, { useState, useContext } from "react";
import DeleteProduct from "./DeleteProduct";
import { AppContext } from "../Context/AppContext";

const Product = ({ _id, title, description, imageURL }) => {
	const {update} = useContext(AppContext)
	const [value, setValue] = useState({
		title: title,
		description: description,
		imageURL: imageURL
	});
	// const [isEditing, setIsEditing] = useState(false);

	const handleChange = (event) => {
		event.persist();
		const { name, value } = event.target;
		setValue((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	// const handleClick = () => {
	// 	setIsEditing(true)
	// };

	// const handleBlur = () => {
	// 	setIsEditing(false)
	// };

	const handleKeypress = (event) => {
		if(event.key === "Enter") {
			console.log(event.key)
			saveChanges()
		}
	};

	const saveChanges = () => {
		update(_id, value) 		
	};

	return (
		<tr id="row">
			<td>
				<input
					onChange={handleChange}
					// onClick={handleClick}
					// onBlur={handleBlur}
					onKeyPress={handleKeypress}
					name="title"
					type="text"
					value={value.title}
				></input>
			</td>
			<td>
				<input
					onChange={handleChange}
					// onClick={handleClick}
					// onBlur={handleBlur}
					onKeyPress={handleKeypress}
					name="description"
					type="text"
					value={value.description}
				></input>
			</td>
			<td>
				<input
					onChange={handleChange}
					// onClick={handleClick}
					// onBlur={handleBlur}
					onKeyPress={handleKeypress}
					name="imageURL"
					type="text"
					value={value.imageURL}
				></input>
			</td>			
			<td>
				<button onClick={saveChanges}>Save changes</button>
				<DeleteProduct _id={_id} />
			</td>
		</tr>
	);
};

export default Product;
