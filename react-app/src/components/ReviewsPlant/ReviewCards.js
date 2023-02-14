import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPlantReviewsThunk } from "../../store/reviewReducer";
import { getPlantDetailsThunk } from "../../store/plants";


const ReviewsForPlant = () =>{
    const dispatch = useDispatch();
    const { plantId } = useParams();

    let reviews = useSelector((state) => state.reviews)
	const myPlant = useSelector((state) => state.plants.singlePlant);
    let reviewsArr = Object.values(reviews)

    useEffect(() => {
        dispatch(loadPlantReviewsThunk(plantId))
        // .then(() => dispatch(getPlantDetailsThunk(plantId)))
    }, [dispatch, plantId])

    let reviewImg;

    const cards = reviewsArr.map(review => {
        if (review.review_image) { /* switch this to check review image variable */
            review.review_image.forEach(image => {
                reviewImg = (
                    <img src={image.url} alt=""/>
                )
            })
        } else {
            reviewImg = null
        }


        return (
            <>
            {/* <div className="total-average-review" key={review}>
                <div>{reviewsArr.length}</div>
                <div>{review.avg_star_rating}</div>
            </div> */}
            <div className="review-card-container" key={review.id}>
                <div>
                    <div>{review.stars}</div>
                    <div>{review.review}</div>
                    <div>Purchased item: {myPlant.name}</div>
                    <div>
                        <i className="fas fa-user fa-2x" />
                        <div>{review.user?.username}</div>
                        {/* <div> date? </div> */}
                    </div>
                </div>
                <div>
                    {reviewImg}
                </div>
            </div>
            </>
        )
    })

    return(
        <div className="review-container">
            <h1>REVIEWS</h1>
            {cards}
        </div>
    )
}

export default ReviewsForPlant;
