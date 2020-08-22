import React, { useContext } from 'react'
import { AppContext } from "../Context/AppContext";

const DeleteProduct = ({_id}) => {
    const {deleteItem} = useContext(AppContext)

    const removeItem = () => {		
		if (
			window.confirm(
				"Are you sure you want to delete this item from the database?"
			)
		) {
			deleteItem(_id)
		} else {
			console.log("Item was not deleted from the database.");
		}
    };
    
    return (
        <button onClick={removeItem}>DELETE</button>
    )
}

export default DeleteProduct
