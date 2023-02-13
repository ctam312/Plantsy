import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlantDetailsThunk } from "../../../store/plants";
import OpenModalButton from "../../OpenModalButton";
import EditPlant from "../EditPlant";
import DeletePlantModal from "../DeletePlant/DeletePlant";
import ReviewsForPlant from "../../ReviewsPlant/ReviewCards";
import CreateReviewModal from "../../ReviewForms/CreateReviewModal";

const OnePlant = () => {
	const myPlant = useSelector((state) => state.plants.singlePlant);
	// console.log("======================", myPlant)
	const user = useSelector((state) => state.session.user)
	const dispatch = useDispatch();
	const { plantId } = useParams();
	// console.log("PLANT ID =======================>", plantId, myPlant.id)
	const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getPlantDetailsThunk(+plantId))
			.then(() => (setIsLoaded(true)))
			// .catch(() => history.push("/"));
	}, [dispatch, plantId, history]);

	if (!myPlant?.id) return null;

	let userLoggedInReview = null
	if (user.user?.id !== null) {
		userLoggedInReview = (
			<div className="create-review-modal-btn">
				{user.user?.id !== myPlant.user_id ? (
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

	return (
		<div>
			<h1>{myPlant.name}</h1>
			<p>Price: {myPlant.price}</p>
			<p>Details: {myPlant.details}</p>
			<img src={myPlant.preview_image_url} alt={myPlant.name} />
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
					// <div className="create-review-button">
					// 	<OpenModalButton
					// 		modalComponent={<CreateReview />}
					// 		buttonText="Create Review"
					// 	/>
					// </div>
					<div>
						<p>create button here</p>
					</div>
				)}
				{userLoggedInReview}
				<ReviewsForPlant />
			</div>
		</div>
	);
};

export default OnePlant;
