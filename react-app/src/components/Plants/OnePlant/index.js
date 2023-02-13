import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getPlantDetailsThunk } from "../../../store/plants";

const OnePlant = ({ match }) => {
	const myPlant = useSelector((state) => state.spots.oneSpot)
	const { }

	useEffect(() => {
		dispatchEvent(getPlantDetailsThunk())


	if (!myPlant?.id)return null (
		<div>
			<h1>{plant.name}</h1>
			<p>Price: {plant.price}</p>
			<p>Details: {plant.details}</p>
			<img src={plant.preview_image_url} alt={plant.name} />
		</div>
	);
};

export default OnePlant;
