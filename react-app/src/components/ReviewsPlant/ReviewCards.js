import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPlantReviewsThunk } from "../../store/reviewReducer";
import { getPlantDetailsThunk } from "../../store/plants";
import UpdateReviewModal from "../ReviewForms/UpdateReviewModal";
import DeleteReview from "./DeleteReview";
import OpenModalButton from "../OpenModalButton";
import "./ReviewCard.css"


const ReviewsForPlant = ({reviewButton}) =>{
    const dispatch = useDispatch();
    const { plantId } = useParams();

    let reviews = useSelector((state) => state.reviews)
    const user = useSelector((state) => state.session.user)
	const myPlant = useSelector((state) => state.plants.singlePlant);
    let reviewsArr = Object.values(reviews)

    useEffect(() => {
        dispatch(loadPlantReviewsThunk(plantId))
        // .then(() => dispatch(getPlantDetailsThunk(plantId)))
    }, [dispatch, plantId])

    let avgStarRating;
    const cards = reviewsArr.map(review => {
        let reviewImg;
        if (review?.review_image) { /* switch this to check review image variable */
            review?.review_image.forEach(image => {
                reviewImg = (
                    <img className="review-image" src={image?.url} alt=""/>
                )
            })
        } else {
            reviewImg = <div>{null}</div>
        }

        avgStarRating = review?.avg_star_rating;
        return (
            <>
            {/* <div className="total-average-review" key={review}>
                <div>{reviewsArr.length}</div>
                <div>{review.avg_star_rating}</div>
            </div> */}
            <div className="whole-review-card-container" key={review.id}>
                <div className="review-card">
                    <div className="left-side-review-card">
                        <div className='star-rating-btns'>
                            <div className="star-rating">
                                {[...Array(5)].map((_, index) => {
                                    const starClass = index < review?.stars ? 'filled-star' : 'empty-star';
                                    return <i key={index} className={`fa fa-star edit-star ${starClass}`} />;
                                })}
                            </div>
                            <div className='btns'>
                                <span className="edit-delete-btn">
                                    <span className="edit-btn">
                                        {user !== null && user?.id === review?.user_id ? (
                                            <OpenModalButton
                                            className='edit-btn'
                                            buttonText="Edit"
                                            modalComponent={
                                                <UpdateReviewModal
                                                review={review}
                                                />
                                            }
                                            />
                                            ) : null}
                                    </span>
                                    <span className="delete-btn">
                                        {user !== null && user?.id === review?.user_id ?
                                            <DeleteReview review={review} myPlant={myPlant}/>
                                            : null
                                        }
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className='actual-review'>{review?.review}</div>
                        <div className="purchased-item-div"><span className="purchased-span">Purchased item: </span>{myPlant.name}</div>
                        <div className="user-pic-name-div">
                            <div>
                                <i className="fas fa-user fa-2x" />
                            </div>
                            <div className='username'>{review.user?.username}</div>
                            {/* <div> date? </div> */}
                        </div>
                    </div>
                    <div className='right-side-review-card'>
                        {reviewImg}
                    </div>
                </div>
            </div>
            </>
        )
    })

    const stars = [...Array(5)].map((_, index) => {
        const starClass = index < avgStarRating ? 'filled-star' : 'empty-star';
        return <i key={index} className={`fa fa-star edit-star ${starClass}`} />;
    })

    return(
        <div className="bottom-review-container">
            <div className='reviews-and-btn-container'>
                <h1>{reviewsArr.length} review(s) {stars}</h1>
                <div>{reviewButton}</div>
            </div>
            {cards}
        </div>
    )
}

export default ReviewsForPlant;
