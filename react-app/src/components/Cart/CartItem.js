import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateCount, removeItem } from '../../store/cart'
import { getAllPlantsThunk, getPlantDetailsThunk } from '../../store/plants';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [count, setCount] = useState(item.count);
  const myPlant = useSelector((state) => state.plants.allPlants[item.id]);

  useEffect(() => {
    setCount(item.count);
    dispatch(getPlantDetailsThunk(item.id))
  }, [item.count]);



  return (
    <>
      <div className="cart-item">
        <div className='cart-header-price-container'>
          <div className="cart-item-header" onClick={() => history.push(`/plants/${myPlant.id}`)}>{myPlant?.name}</div>
          {/* <div className="cart-item-price">${myPlant?.price.toFixed(2) * item.count}</div> */}
          <div className="cart-item-price">${(Math.round(myPlant?.price * item.count * 100) / 100).toFixed(2)}</div>
        </div>
        <img className="cart-image-pic"
          src={myPlant?.preview_image_url}
          alt={myPlant?.name}
          onError={e => { e.currentTarget.src = "https://friendlystock.com/wp-content/uploads/2020/12/3-kawaii-indoor-plant-cartoon-clipart.jpg"; }}
          onClick={() => history.push(`/plants/${myPlant.id}`)}
        />
      </div>
        <div className="cart-item-menu">
          <button
            className="cart-item-button"
            onClick={() => {
              dispatch(updateCount(myPlant?.id, item?.count + 1));
            }}
            >
            +
          </button>
          <span className='count-span'>{count}</span>
          <button
            className="cart-item-button"
            onClick={() => {
              dispatch(updateCount(myPlant?.id, item?.count - 1))
            }}
          >
            -
          </button>
          <button
            className="cart-item-button"
            onClick={() => {
              dispatch(removeItem(item.id))
            }}
          >
            Remove
          </button>
        </div>
    </>
  );
}

export default CartItem;
