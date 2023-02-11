import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updateReviewForPlantThunk } from "../../store/reviewReducer";


const CreateReviewModal = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { plantId } = useParams();

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
            image,
            // plant_id: plantId,
            // user_id: sessionUser.user.id
        }

        return await dispatch(updateReviewForPlantThunk(reviewDetails, plantId))
            .then(() => history.push(`/plants/${plantId}`))
            .then(setIsLoaded(true))
            .then(() => closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    }

    // Dynamically load the plants details page to show updates
    // useEffect(() => {
    //     dispatch()
    //     setIsLoaded(false)
    // }, [dispatch, plantId, isLoaded])

    return (
        <div className="create-review-container">
            <h3 className="create-review-header">Leave review</h3>
            <form
                className="review-form-container"
                onSubmit={handleSubmit}
            >
                <ul className="review-error-map">
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                <label>
                    Review:
                    <input
                        type="text"
                        name="review"
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
                        Image URL:
                        <input
                            type="url"
                            name="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Enter an image URL (http://www.example.com/)"
                            />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateReviewModal
