import React, { useState, useRef } from "react";
import "./App.css";

function App() {
	const [items, setItems] = useState(["item One","item Two"]);
	const [name, setName] = useState("");
	const [error, setError] = useState('');	
	// save reference for dragItem and dragOverItem
	const dragItem = useRef(null);
	const dragOverItem = useRef(null);

	/**
	 * const handle drag sorting
	 */
	const handleSort = () => {
		let item = [...items];
		//remove and save the dragged item content 
		const draggedItemContent = item.splice(dragItem.current, 1)[0]
		//switch the position
		item.splice(dragOverItem.current, 0, draggedItemContent)
		//reset the position ref
 		dragItem.current = null;
		dragOverItem.current = null;
		//update the actual array
		setItems(item);
	};

	/**
	 * handle name change
	 * @param {object} event 
	 */
	const handleNameChange = (event) => {
		setName(event.target.value)
	}

	/**
	 * handle new item addition
	 */
	const handleAddItem = () => {
		if (!name) {
			setError("Please enter your name");
		} else {
			const addNewItems = [...items];	
			addNewItems.push(name);
			setItems(addNewItems);
			setName('');
			setError('');
		}
  };

	return (
		<div className="app">
			<h2></h2>
			<div className="input-group">
				<input
					type="text"
					name="fruitName"
					value={name}
					placeholder="e.g Name"
					onChange={handleNameChange}
				/>
				<span className="arror">{error}</span>
				<button className="btn" onClick={handleAddItem}>
					<i className="fa fa-plus" style={{ fontSize: '30px' }}></i>
				</button>
			</div>
			<div className="list-container">
				{items.map((item, index) => (
					<div
						key={index}
						className="list-item"
						draggable
						onDragStart={() => (dragItem.current = index)}
						onDragEnter={() => (dragOverItem.current = index)}
						onDragEnd={handleSort}
						onDragOver={(event) => event.preventDefault()}>
						{/* <i className="fa fa-bar"></i> */}
						<h3>{item}</h3>
					</div>
				))}
			</div>
		</div>
	)
}
export default App;
