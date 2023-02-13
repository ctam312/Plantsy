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
            details
		};

		const { id } = myPlant;

		const plantNeed = {
			id,
		};

		dispatch(editPlantThunk(editedPlant, plantNeed))
		.then(() => dispatch(getPlantDetailsThunk(myPlant.id)))
			.then(() => history.push(`/plants/${id}`))
			.then(closeModal)
			.catch(async (res) => {
				// console.log(res)
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="edit-spot-container">
			<div className="close-modal">
				<button onClick={closeModal}>
					<i className="fa-solid fa-xmark" />
				</button>
			</div>

			<div className="edit-spot-header">
				<h1>Edit your listing</h1>
			</div>

			<form className="edit-spot-form" onSubmit={handleSubmit}>
				<div className="edit-spot-form-parts">
					<div className="edit-spot-errors">
						<ul>
							{errors.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
					<label className="edit-spot-form-label">
						Name:
						<input
						className="edit-spot-form-input"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<label className="edit-spot-form-label">
						Price:
						<input
						className="edit-spot-form-input"
							type="text"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</label>
					<label className="edit-spot-form-label">
						Details:
						<input
						className="edit-spot-form-input"
							type="text"
							value={details}
							onChange={(e) => setDetails(e.target.value)}
						/>
					</label>
					<button className ="submitBtn" type="submit">Apply Edits</button>
				</div>
			</form>
		</div>
	);
}

export default EditPlant;
