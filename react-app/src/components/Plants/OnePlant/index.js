import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlantDetailsThunk } from "../../../store/plants";
import OpenModalButton from "../../OpenModalButton";
import EditPlant from "../EditPlant";
import DeletePlantModal from "../DeletePlant/DeletePlant";
import ReviewsForPlant from "../../ReviewsPlant/ReviewCards";
import CreateReviewModal from "../../ReviewForms/CreateReviewModal";
import Cart from "../../Cart/Cart"

import "./OnePlant.css"

const OnePlant = () => {
	const myPlant = useSelector((state) => state.plants.singlePlant);
	const user = useSelector((state) => state.session.user)
	const review = useSelector((state) => state.reviews)
	const reviewsArr = Object.values(review)
	const dispatch = useDispatch();
	const { plantId } = useParams();
	const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
	console.log(user)

	useEffect(() => {
		dispatch(getPlantDetailsThunk(+plantId))
			.then(() => (setIsLoaded(true)))
			// .catch(() => history.push("/"));
	}, [dispatch, plantId, history]);

	if (!myPlant?.id) return null;

	let reviewButton = null
	if (user?.id !== myPlant?.user_id) {
		reviewButton = (
			<div className="create-review-modal-btn">
				{user?.user?.id !== myPlant?.user_id ? (
					<div>
						<OpenModalButton
							buttonText="Leave Review"
							modalComponent={
								<CreateReviewModal />
							}
						/>
					</div>
				) : null }
			</div>
		)
	}

	if (user) {
		reviewsArr.forEach(review => {
			if(review.user_id === user.id) {
				reviewButton = (<div>{null}</div>)
			}
		})
	} else {
		reviewButton = (<div>{null}</div>)
	}

	return (
		<div className="one-plant-container">
			<div className="top-plant-container">
				<img className="preview-image-div" src={myPlant.preview_image_url} alt={myPlant.name} />
				<div className="plant-information-container">
					<p className="price-tag">$ {myPlant.price.toFixed(2)}</p>
					<div className="plant-name-div">{myPlant.name}</div>

					<button className='add-cart-button'>
						Add to Cart</button>

					<p>Details: {myPlant.details}</p>
				</div>
			</div>
				<div className="edit-delete-modal">
					{user && user?.id === myPlant?.user_id ? (
						<div className="edit-delete-btn">
							<OpenModalButton
								className="edit-spot"
								modalComponent={<EditPlant />}
								buttonText="Edit Plant"
							/>
							<OpenModalButton
								className="delete-spot"
								modalComponent={<DeletePlantModal />}
								buttonText="Delete Spot"
								/>
						</div>
					) : (
						null
					)}
				</div>
				{reviewButton}
				<ReviewsForPlant />
		</div>
	);
};

export default OnePlant;
