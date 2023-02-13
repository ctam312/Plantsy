import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPlantDetailsThunk } from "../../../store/plants";

const OnePlant = () => {
	const myPlant = useSelector((state) => state.plants.singlePlant)
	const dispatch = useDispatch();
	const { plantId } = useParams();
	const history = useHistory();

	useEffect(() => {
		dispatch(getPlantDetailsThunk(plantId)).catch(() => history.push("/"));
	}, [dispatch, plantId, history]);


	if (!myPlant?.id)return null; 
	return (
		<div>
			<h1>{myPlant.name}</h1>
			<p>Price: {myPlant.price}</p>
			<p>Details: {myPlant.details}</p>
			<img src={myPlant.preview_image_url} alt={myPlant.name} />
		</div>
	);
};

export default OnePlant;
