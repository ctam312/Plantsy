import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory} from "react-router-dom";
import { useModal } from "../../context/Modal";
import { loadPlantReviewsThunk, updateReviewForPlantThunk } from "../../store/reviewReducer";
import "./UpdateReviewModal.css"


const UpdateReviewModal = ({review}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const myPlant = useSelector((state) => state.plants.singlePlant);

    const [editReview, setEditReview] = useState(review.review);
    const [stars, setStars] = useState(review.stars);
    // const [image, setImage] = useState(review.image);
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([]);

        const reviewDetails = {
            review: editReview,
            stars,
            plant_id: myPlant.id,
            user_id: sessionUser.user.id
        }

        // return await dispatch(updateReviewForPlantThunk(reviewDetails, review))
        //     .then(() => history.push(`/plants/${myPlant.id}`))
        //     .then(setIsLoaded(true))
        //     .then(() => closeModal())
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors)
        //     });

        const data = await dispatch(updateReviewForPlantThunk(reviewDetails, review));
        if (data) {
            setErrors(data)
        } else {
            closeModal()
            dispatch(loadPlantReviewsThunk(myPlant.id))
            history.push(`/plants/${myPlant.id}`);
            setIsLoaded(true);
        }
    }


    return (
        <div className="create-review-container">
            {/* <div className="close-modal"> */}
				<span className="review-close-button" onClick={closeModal}>
					{/* <i className = "fa-solid fa-xmark" /> */}
					X
				</span>
			{/* </div> */}
            <h3 className="create-review-header">Update review</h3>
            <form
                className="review-form-container"
                onSubmit={handleSubmit}
            >
                <ul className="errors-map">
                    {errors.length > 0 ? errors.map((error) => <li key={error}>{error}</li>) : null}
                </ul>
                <div className="label-tag-container">

                    <label>
                        Review:
                        <input
                            type="text"
                            maxLength='1000'
                            name="review"
                            value={editReview}
                            placeholder="Enter a review"
                            onChange={(e) => setEditReview(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                            Star Rating:
                            <input
                                type='number'
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                                max='5'
                                min='1'
                                required
                            />
                    </label>
                </div>
                {/* <label>
                        Image URL:
                        <input
                            type="url"
                            name="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Enter an image URL (http://www.example.com/)"
                            />
                </label> */}
                <button className="log-in-demo-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateReviewModal
