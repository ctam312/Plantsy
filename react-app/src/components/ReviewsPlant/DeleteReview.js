import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { deleteReviewForPlantThunk, loadPlantReviewsThunk } from "../../store/reviewReducer";

const DeleteReview = ({review, myPlant}) => {
    const dispatch = useDispatch();
    // const history = useHistory();

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
                <button className="delete-review" onClick={handleClick}>x</button>
            </>
    )
}

export default DeleteReview
