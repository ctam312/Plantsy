import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPlantReviewsThunk } from "../../store/reviewReducer";



const ReviewsForPlant = ({plant}) =>{
    const dispatch = useDispatch();
    const { plantId } = useParams();

    let reviews = useSelector((state) => state.reviews)
    // console.log('REVIEWS =====> ', reviews)
    let reviewsArr = Object.values(reviews)

    useEffect(() => {
        dispatch(loadPlantReviewsThunk(plantId));
    }, [dispatch, plantId])

    let reviewImg;

    const cards = reviewsArr.map(review => {

        if (review.review_image.url) { /* switch this to check review image variable */
            reviewImg = (
                <img src='{review.review_image.url}'/>
            )
        } else {
            reviewImg = null
        }


        return (
            <div className="review-card-container">
                <div>
                    <div>{review.stars}</div>
                    <div>{review.review}</div>
                    <div>Purchased item: {plant.name}</div>
                    <div>
                        <i className="fas fa-user fa-2x" />
                        <div>{review.user.username}</div>
                        {/* <div> date? </div> */}
                    </div>
                </div>
                <div>
                    {reviewImg}
                </div>
            </div>
        )
    })

    return(
        <div className="review-container">
            <h1>REVIEWS</h1>
            <div className="total-average-review">
                <div>reviews_count</div>
                <div>review.avgStarRating</div>
            </div>
            {cards}
        </div>
    )
}

export default ReviewsForPlant;
