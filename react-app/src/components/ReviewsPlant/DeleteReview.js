import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { deleteReviewForPlantThunk } from "../../store/reviewReducer";

const DeleteReview = ({review}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { plantId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);

    const handleClick = async () => {
        dispatch(deleteReviewForPlantThunk(review.id))
        setIsLoaded(true)
        history.push(`/plants/${plantId}`)
    }


    // useEffect(() => {
    //     dispatch((plantId))
    //     setIsLoaded(false);
    // },[dispatch, plantId, isLoaded])

    return (
            <>
                <button className="delete-review" onClick={handleClick}>Delete</button>
            </>
    )
}

export default DeleteReview
