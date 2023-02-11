import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";



const ReviewsForPlant = ({plant}) =>{
    const dispatch = useDispatch();
    const { plantId } = useParams();



    let reviews = useSelector((state) => state.reviews)
    let reviewsArr = Object.values(reviews)

    let reviewImg;

    const cards = reviewsArr.map(review => {

        if (review.Img) { /* switch this to check review image variable */
            reviewImg = (
                <img src='{image.url}'/>
            )
        } else {
            reviewImg = null
        }


        return (
            <div className="review-card-container">
                <div>
                    <div>review.stars</div>
                    <div>review.review</div>
                    <div>Purchased item: item.name</div>
                    <div>
                        <i className="fas fa-user fa-2x" />
                        <div>review.user.name</div>
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
            <div className="total-average-review">
                <div>reviews_count</div>
                <div>review.avgStarRating</div>
            </div>
            {cards}
        </div>
    )
}

export default ReviewsForPlant
