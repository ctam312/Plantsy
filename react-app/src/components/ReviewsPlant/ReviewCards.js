import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";



const ReviewsForPlant = ({plant}) =>{
    const dispatch = useDispatch();
    const { plantId } = useParams();



    let reviews = useSelector((state) => state.reviews)
    let reviewsArr = Object.values(reviews)

    return(
        <div className="review-card-container">
            <div className="total-average-review">
                <div>reviews_count</div>
                <div>review.avgStarRating</div>
            </div>
            <div className="review-comment-container">
            {reviewsArr.map((review) => (
                <div className="review-by-user-div">
                    <div></div>
                </div>
            ))}

            </div>
        </div>
    )
}

export default ReviewsForPlant
