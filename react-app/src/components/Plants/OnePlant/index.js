import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlantDetailsThunk } from "../../../store/plants";
import OpenModalButton from "../../OpenModalButton";
import EditPlant from "../EditPlant";
import DeletePlantModal from "../DeletePlant/DeletePlant";
import ReviewsForPlant from "../../ReviewsPlant/ReviewCards";
import CreateReviewModal from "../../ReviewForms/CreateReviewModal";
import { addItem, updateCount } from '../../../store/cart';
import { getCartItemById } from "../../../store/cart";

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
	const cartItem = useSelector(getCartItemById(myPlant.id));

	// console.log('myPlant ----> ', myPlant)

	useEffect(() => {
		dispatch(getPlantDetailsThunk(+plantId))
			.then(() => (setIsLoaded(true)))
			// .catch(() => history.push("/"));
	}, [dispatch, plantId, history]);

	const cartAdd = () => {
		if (cartItem){
			dispatch(updateCount(+plantId, cartItem.count + 1));
		} else {
			dispatch(addItem(+plantId));
		}
		history.push('/cart');
	};

	if (!myPlant?.id) return null;

	let reviewButton = null
	if (user?.id !== myPlant?.user_id) {
		reviewButton = (
			<div className="create-review-modal-btn">
				{user?.user?.id !== myPlant?.user_id ? (
					<div>
						<OpenModalButton
							buttonText="Leave Review"
							className='review-btn'
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
				{/* <div className='extra-photos-container'>optional photos</div> */}
				<div>
					<img className="preview-image-div" src={myPlant.preview_image_url} alt={myPlant.name} />
				</div>
				<div className="plant-information-container">
					<div className='price-edit'>
						<p className="price-tag ">$ {myPlant.price.toFixed(2)}</p>
						<div className="edit-delete-modal">
							{user && user?.id === myPlant?.user_id ? (
								<div className="edit-delete-button">
									<OpenModalButton
										className="edit-spot"
										modalComponent={<EditPlant />}
										buttonText="Edit Plant"
									/>
									<OpenModalButton
										className="delete-spot"
										modalComponent={<DeletePlantModal />}
										buttonText="Delete Plant"
										/>
								</div>
							) : (
								null
							)}
						</div>
					</div>
					<div className="plant-name-div">{myPlant.name}</div>

					<button className='add-cart-button' onClick={cartAdd}>
						Add to Cart</button>
					<div className='fast-shipping'>
						<div>
							<i className="fa-solid fa-truck-fast fa-2x"></i>
						</div>
						<div>
							<span className='fast-shipping-text-hoo'>Hooray!</span> <span className='fast-shipping-text'>This item ships for free</span>
						</div>
						</div>
					<div>
						<h4 className='desc-title'>Description</h4>
						<div className='description'> {myPlant.details}</div>
					</div>
				</div>
			</div>
				{/* {reviewButton} */}
				<ReviewsForPlant reviewButton={reviewButton}/>
		</div>
	);
};

export default OnePlant;
