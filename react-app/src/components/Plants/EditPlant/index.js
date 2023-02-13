import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { editSpot } from "../../store/spots";
import { getSpot } from "../../store/spots";
import "./EditSpot.css";

function EditSpot() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	// console.log(spotId);
	const myPlant = useSelector((state) => state.plants.singlePlant);

	const [name, setName] = useState(myPlant?.name || "");
	const [price, setPrice] = useState(myPlant?.price || "");
    const [details, setDetails] = useState(myPlant?.details || "");
    const [, setPrice] = useState(myPlant?.price || "");
    


	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const errorArr = [];
		if (name.length <= 0 || name.length >= 50)
			errorArr.push("Name must be less than 50 characters");
		if (address.length === 0) errorArr.push("You must enter a valid Address.");
		if (city.length === 0) errorArr.push("You must enter a valid city.");
		if (state.length === 0) errorArr.push("You must enter a valid state.");
		if (country.length === 0) errorArr.push("You must enter a valid country.");
		if (description.length === 0)
			errorArr.push("You must enter a valid description.");
		if (price <= 0) errorArr.push("You must enter a valid price.");

		setErrors(errorArr);
	}, [name, address, city, state, country, description, price]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		const editedSpot = {
			address,
			city,
			state,
			country,
			lat: 88.0,
			lng: 188.88,
			name,
			description,
			price,
		};

		const { id, numReviews, avgStarRating, SpotImages } = spot;

		const spotNeed = {
			id,
			numReviews,
			avgStarRating,
			SpotImages,
		};

		dispatch(editSpot(editedSpot, spotNeed))
		.then(() => dispatch(getSpot(spot.id)))
			.then(() => history.push(`/spots/${id}`))
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
						Address:
						<input
						className="edit-spot-form-input"
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</label>
					<label className="edit-spot-form-label">
						City:
						<input
						className="edit-spot-form-input"
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</label>
					<label className="edit-spot-form-label">
						State:
						<input
						className="edit-spot-form-input"
							type="text"
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>
					</label>
					<label className="edit-spot-form-label">
						Country:
						<input
						className="edit-spot-form-input"
							type="text"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
					</label>
					<label className="edit-spot-form-label">
						Description:
						<input
						className="edit-spot-form-input"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</label>
					<label className="edit-spot-form-label">
						Price:
						<input
						className="edit-spot-form-input"
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</label>
					<button className ="submitBtn" type="submit">Apply Edits</button>
				</div>
			</form>
		</div>
	);
}

export default EditSpot;
