import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";

const AddToList = () => {
	const {create} = useContext(AppContext)
	const [formState, setFormState] = useState({
		title: "",
		description: "",
		imageURL: ""
	});

	// useEffect(() => {
	// 	console.log(formState);
	// }, [formState]);

	const handleSubmit = (event) => {
        create(event, formState)       
	};

	const handleChange = (event) => {
		event.persist();
		const { id, value } = event.target;
		setFormState((prevState) => {
			return { ...prevState, [id]: value };
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">Title: </label>
			<input
				type="text"
				id="title"
				value={formState.title}
				onChange={handleChange}
			></input>
			<br />
			<label htmlFor="description">Descripton: </label>
			<input
				type="text"
				id="description"
				value={formState.description}
				onChange={handleChange}
			></input>
			<br />
			<label htmlFor="imageURL">Image URL: </label>
			<input
				type="text"
				id="imageURL"
				value={formState.imageURL}
				onChange={handleChange}
			></input>
			<br />
			<input type="submit" value="Create product" />
		</form>
	);
};

export default AddToList;
