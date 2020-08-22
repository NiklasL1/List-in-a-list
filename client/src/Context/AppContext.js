import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const initialList = [];

const AppContextProvider = ({ children }) => {
	const [list, setList] = useState(initialList);
	const [loading, setLoading] = useState(true);

	// create
	const create = (event, values) => {
		event.preventDefault();
		fetch("http://localhost:4000/api/products", {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...values }),
		})
			.then((res) => res.json())
			.then((res) => setList((prevState) => [...prevState, res]))
			.catch((error) => {
				console.error("Error:", error);
			});
	};
	// read

	const getData = async () => {
		const url = "http://localhost:4000/api/products/";
		const response = await fetch(url);
		const data = await response.json();
		setList(data);
		setLoading(false);
	};

	useEffect(() => {
		getData();
		// fetch("http://localhost:4000/api/products")
		// 	.then((res) => res.json())
		// 	.then((res) => setState(res));
	}, []);

	//update
	const update = (_id, values) => {
		fetch(`http://localhost:4000/api/products/${_id}`, {
			method: "put",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...values }),
		})
			.then((res) => res.json())			
			.then((res) => {
				const updatedState = list.map((item) => {
					if (item._id !== _id) return item;
					return res;
				});
				setList(updatedState);
			})			
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	//delete
	const deleteItem = (_id) => {
		fetch(`http://localhost:4000/api/products/${_id}`, {
			method: "delete",
		})
			.then(() => setList(list.filter((item) => item._id !== _id)))
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<AppContext.Provider value={{ list, loading, create, update, deleteItem }}>
			{children}
		</AppContext.Provider>
	);
};
export default AppContextProvider;
