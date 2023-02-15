import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPlantReviewsThunk } from "../../store/reviewReducer";
import { getPlantDetailsThunk } from "../../store/plants";
import UpdateReviewModal from "../ReviewForms/UpdateReviewModal";
import DeleteReview from "./DeleteReview";
import OpenModalButton from "../OpenModalButton";
import "./ReviewCard.css"


const ReviewsForPlant = () =>{
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

    let reviewImg;
    let avgStarRating;
    const cards = reviewsArr.map(review => {
        if (review?.review_image) { /* switch this to check review image variable */
            review?.review_image.forEach(image => {
                reviewImg = (
                    <img className="review-image" src={image?.url} alt=""/>
                )
            })
        } else {
            reviewImg = null
        }

        avgStarRating = review?.avg_star_rating;
        return (
            <>
            {/* <div className="total-average-review" key={review}>
                <div>{reviewsArr.length}</div>
                <div>{review.avg_star_rating}</div>
            </div> */}
            <div className="whole-review-card-container" key={review.id}>
                <div className="review-section">
                    <div className="star-rating">
                        {/* <i class="fa fa-star edit-star"></i>
                        <i class="fa fa-star edit-star"></i>
                        <i class="fa fa-star edit-star"></i>
                        <i class="fa fa-star edit-star"></i>
                        <i class="fa fa-star edit-star"></i>
                        {review?.stars} */}
                          {[...Array(5)].map((_, index) => {
                            const starClass = index < review?.stars ? 'filled-star' : 'empty-star';
                            return <i key={index} className={`fa fa-star edit-star ${starClass}`} />;
                        })}
                    </div>
                    <div>{review?.review}</div>
                    <div className="purchased-item-div"><span className="purchased-span">Purchased item: </span>{myPlant.name}</div>
                    <div className="user-pic-name-div">
                        <i className="fas fa-user fa-2x" />
                        <div>{review.user?.username}</div>
                        {/* <div> date? </div> */}
                    </div>
                    {user !== null && user?.id === review?.user_id ? (
                        <OpenModalButton
                        buttonText="Edit"
                        modalComponent={
                            <UpdateReviewModal
                            review={review}
                            />
                        }
                        />
                        ) : null}
                  {user !== null && user?.id === review?.user_id ?
                    <DeleteReview review={review} myPlant={myPlant}/>
                    : null
                }
                </div>
                <div>
                    {reviewImg}
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
        <div className="review-container">
            <h1>{reviewsArr.length} review(s) {stars}</h1>
            {cards}
        </div>
    )
}

export default ReviewsForPlant;
