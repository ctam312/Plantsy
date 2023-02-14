import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { deleteReviewForPlantThunk } from "../../store/reviewReducer";
import { getPlantDetailsThunk } from "../../store/plants";

const DeleteReview = ({review, myPlant}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);


    console.log("AM I GETTING TO MY DELETE COMPONENT FROM CLICKING ======>")
    const handleClick = async () => {
        dispatch(deleteReviewForPlantThunk(review.id))
        setIsLoaded(true)
        // history.push(`/plants/${myPlant.id}`)
    }


    useEffect(() => {
        dispatch(getPlantDetailsThunk(myPlant.id))
        setIsLoaded(false)
    }, [dispatch, myPlant.id, isLoaded])

    return (
            <>
                <button className="delete-review" onClick={handleClick}>Delete</button>
            </>
    )
}

export default DeleteReview
