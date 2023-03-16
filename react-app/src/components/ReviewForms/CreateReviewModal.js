import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createPlantReviewThunk, loadPlantReviewsThunk } from "../../store/reviewReducer";
import "./CreateReviewModal.css"

const CreateReviewModal = () => {
    const dispatch = useDispatch();
    const history = useHistory()
	const myPlant = useSelector((state) => state.plants.singlePlant);

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([]);

        const reviewDetails = {
            review,
            stars,
            plant_id: myPlant?.id,
            user_id: sessionUser?.user?.id
        }

        const revImage = {
            url: image
        }


        const data = await dispatch(createPlantReviewThunk(reviewDetails, myPlant, revImage));
        if (data) {
            const errorMessages = Object.values(data);
            const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
            setErrors(formattedErrorMessages);
        } else {
            closeModal()
            history.push(`/plants/${myPlant.id}`);
            setIsLoaded(true);
        }
    }


    // Dynamically load the plants details page to show updates
    useEffect(() => {
        // dispatch(getPlantDetailsThunk(myPlant.id))
        return () => {
            dispatch(loadPlantReviewsThunk(myPlant.id))
            setIsLoaded(false)
        }
        // closeModal()
    }, [dispatch, myPlant.id, isLoaded])



    return (
        <div className="create-review-container">
            <span className="review-close-button" onClick={closeModal}>
					{/* <i className = "fa-solid fa-xmark" /> */}
					<i className="fas fa-times"></i>
				</span>
            <h3 className="create-review-header">Leave review</h3>
            <form
                className="review-form-container"
                onSubmit={handleSubmit}
            >
                <ul className="errors-map">
                    {/* {errorList} */}
                    {errors.length > 0 ? errors.map((error) => <li key={error}>{error}</li>) : null}
                </ul>
                <div className="label-tag-container">
                    <label>
                        Review:
                        <input
                            type="text"
                            name="review"
                            // maxLength='1000'
                            value={review}
                            placeholder="Enter a review"
                            onChange={(e) => setReview(e.target.value)}
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
                    <label>
                            Image URL (optional):
                            <input
                                type="url"
                                name="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Enter an image URL (http://www.example.com/)"
                                />
                    </label>
                </div>
                <button className="log-in-demo-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateReviewModal
