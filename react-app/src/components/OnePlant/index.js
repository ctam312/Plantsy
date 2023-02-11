import React, { useState, useEffect } from "react";
import { getPlantDetailsThunk } from "../../store/plants";

const OnePlant = ({ match }) => {
	const [plant, setPlant] = useState({});
	const { id } = match.params;

	useEffect(() => {
		const fetchData = async () => {
			const plant = await getPlantDetailsThunk(id);
			setPlant(plant);
		};

		fetchData();
	}, [id]);

	return (
		<div>
			<h1>{plant.name}</h1>
			<p>Price: {plant.price}</p>
			<p>Details: {plant.details}</p>
			<img src={plant.preview_image_url} alt={plant.name} />
		</div>
	);
};

export default OnePlant;
