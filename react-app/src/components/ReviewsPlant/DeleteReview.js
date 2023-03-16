import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { deleteReviewForPlantThunk, loadPlantReviewsThunk } from "../../store/reviewReducer";
import { useModal } from "../../context/Modal";
import './DeleteReview.css';

const DeleteReview = ({review, myPlant}) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { closeModal } = useModal();

    const [isLoaded, setIsLoaded] = useState(false);

    const handleClick = async () => {
        dispatch(deleteReviewForPlantThunk(review.id))
        setIsLoaded(true)
        // history.push(`/plants/${myPlant.id}`)
    }


    useEffect(() => {
        // dispatch(getPlantDetailsThunk(myPlant.id))
        dispatch(loadPlantReviewsThunk(myPlant.id))
        setIsLoaded(false)
    }, [dispatch, myPlant.id, isLoaded])

    return (
        <>
            <div className="delete-wrapper">
                <div className="x-button">
                    <div className="exit" onClick={closeModal}>
                        {/* x */}
                        <i className="fas fa-times"></i>
                    </div>
                </div>

                <div className="delete-pop-up">
                    <div className="delete-header-title">Delete this review?</div>
                    <p>(This is permanent and cannot be undone.)</p>
                    <form onSubmit={handleClick}>
                    <button className="log-in-demo-button" type="submit">Confirm Delete</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DeleteReview
