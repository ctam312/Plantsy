import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPlantThunk, getPlantDetailsThunk } from "../../../store/plants";
import { useModal } from "../../../context/Modal";
import "./EditPlant.css";

function EditPlant() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	// console.log(spotId);
	const myPlant = useSelector((state) => state.plants.singlePlant);

	const [name, setName] = useState(myPlant?.name || "");
	const [price, setPrice] = useState(myPlant?.price || "");
    const [details, setDetails] = useState(myPlant?.details || "");

	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const errorArr = [];
		if (name.length === 0) errorArr.push("You must enter a name.");
		if (price.length <= 0) errorArr.push("You must enter a valid price.");
		if (details.length === 0) errorArr.push("You must have some details about the plant.");

		setErrors(errorArr);
	}, [name, price, details]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		const editedPlant = {
			name,
			price,
            details,
			// preview_image_url: myPlant.preview_image_url,
			// user_id: myPlant.user_id
		};

		const { id, preview_image_url, user_id } = myPlant;
		// console.log(myPlant)

		const plantNeed = {
			id,
			preview_image_url,
			user_id
		};

		dispatch(editPlantThunk(editedPlant, plantNeed))
		.then(() => dispatch(getPlantDetailsThunk(myPlant.id)))
			.then(() => history.push(`/plants/${plantNeed.id}`))
			.then(closeModal)
			.catch(async (res) => {
				// console.log(res)
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="edit-plant-container">
			<div className="close-modal">
				<span style={{cursor:"pointer"}} onClick={closeModal}>
					{/* <i className="fa-solid fa-x" /> */}
					X
				</span>
			</div>

			<div className="edit-plant-header">
				<h1>Edit your plant</h1>
			</div>

			<form className="edit-plant-form" onSubmit={handleSubmit}>
				<div className="edit-plant-form-parts">
					<div className="errors-map">
						<ul>
							{errors.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
					<div className="label-tag-container">

						<label className="edit-plant-form-label">
							Name:
							<input
							className="edit-plant-form-input"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</label>
						<label className="edit-plant-form-label">
							Price:
							<input
							className="edit-plant-form-input"
								type="number"
								value={price}
								min="0.01"
								step="0.01"
								onChange={(e) => setPrice(e.target.value)}
								required
							/>
						</label>
						<label className="plant-form-details-label">
							Details:
							<textarea
								className="plant-form-details"
								type="text"
								value={details}
								onChange={(e) => setDetails(e.target.value)}
								required
							/>
						</label>
					</div>
					<button className ="log-in-demo-button" type="submit">Apply Edits</button>
				</div>
			</form>
		</div>
	);
}

export default EditPlant;
