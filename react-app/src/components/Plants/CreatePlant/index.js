import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createPlantThunk } from "../../../store/plants";
import "./CreatePlant.css";

function CreatePlantModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [details, setDetails] = useState("");
	const [preview_image_url, setPreview_image_url] = useState("");
    const user_id = useSelector((state) => state.session.user.id)



	const handleSubmit = async(e) => {
		e.preventDefault();
		setErrors([]);
		const newPlant = {
			name,
            price,
            details,
            preview_image_url,
            user_id
		};


		dispatch(createPlantThunk(newPlant))
			// console.log(plant)
			.then((res) => {history.push(`/plants/${res.id}`)})

			// .then(closeModal)
			.catch(async (res) => {
				// const data = await res.json();
				if (res && res.errors) setErrors(res.errors);
			});
            // newPlantId = plant?.id
            // history.push(`/plants/${newPlantId}`)
            closeModal()
	};

	return (
		<div className="add-plant-container">

			<div className="close-modal">
				<span style={{cursor:"pointer"}} onClick={closeModal}>
					{/* <i className = "fa-solid fa-xmark" /> */}
					X
				</span>
			</div>

			<div className="add-spot-header">
				<h1>Create a plant</h1>
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
						Create Plant
					</button>
                    </div>
				</div>
			</form>
		</div>
	);
}

export default CreatePlantModal;
