import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePlantThunk } from "../../../store/plants";


const DeletePlantModal = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);
	const plant = useSelector((state) => state.plants.singlePlant);

	const handleSubmit = async (e) => {
       e.preventDefault();
       setErrors([]);

     dispatch(deletePlantThunk(plant.id))
      .then(() => history.push('/'))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

return (
    <div className="delete-wrapper">

        <div className="x-button">
            <div className="exit" onClick={closeModal}>
                x
                <i className="fa-solid fa-xmark" />
            </div>
        </div>

        <div className="header">
            <h2>Delete this listing?</h2>
            <p>(This is permanent and cannot be undone.)</p>
        </div>

        <div>
            <ul className="errors">
            {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
            </ul>
        </div>

        <form onSubmit={handleSubmit}>
                <button className="confirm-delete-btn" type="submit">Confirm Delete</button>
        </form>

    </div>
  )
};

export default DeletePlantModal;
