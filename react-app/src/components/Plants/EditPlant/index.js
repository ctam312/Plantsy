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
	const myPlant = useSelector((state) => state.plants.singlePlant);

	const [name, setName] = useState(myPlant?.name || "");
	const [price, setPrice] = useState(myPlant?.price || "");
    const [details, setDetails] = useState(myPlant?.details || "");
	const [preview_image_url, setPreview_image_url] = useState(myPlant?.preview_image_url || "");

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
			preview_image_url,
		};

		const { id, user_id } = myPlant;

		const plantNeed = {
			id,
			user_id
		};

		dispatch(editPlantThunk(editedPlant, plantNeed))
		.then(() => dispatch(getPlantDetailsThunk(myPlant.id)))
			.then(() => history.push(`/plants/${plantNeed.id}`))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="add-plant-container">

			<div className="close-modal">
				<span style={{cursor:"pointer"}} onClick={closeModal}>
					{/* <i className = "fa-solid fa-xmark" /> */}
					<i className="fas fa-times"></i>
				</span>
			</div>

			<div className="add-plant-header">
				<h2>Edit Plant</h2>
			</div>

			<div className="add-spot-errors">
				<ul className="errors-map">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			</div>

			<form className="add-plant-form" onSubmit={handleSubmit}>
				<div>
					<div className="label-tag-container">
						<label className="add-spot-form-label">
							Name:
							<input
							className = "add-spot-form-input"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								maxLength="300"
								required
							/>
						</label>

						<label className="add-spot-form-label">
							Price:
							<input
							className = "add-spot-form-input"
								type="number"
								value={price}
								min="0.01"
								step="0.01"
								onChange={(e) => setPrice(e.target.value)}
								required
							/>
						</label>
						<div className="details-label">Details:</div>
							<label className="plant-add-details-label">
								{/* Details: */}
								<textarea
								className = "plant-add-details"
									type="text"
									value={details}
									onChange={(e) => setDetails(e.target.value)}
									maxLength="1000"
									required
								/>
							</label>

						<label className="add-spot-form-label">
							Preview Image URL:
							<input
							className = "add-spot-form-input"
								name="url"
								type="url"
								value={preview_image_url}
								onChange={(e) => setPreview_image_url(e.target.value)}
								maxLength="300"
								required
							/>
						</label>
					</div>

					<div className = "submitBtn">
					<button className="log-in-demo-button" type="submit">
						Edit Plant
					</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditPlant;
