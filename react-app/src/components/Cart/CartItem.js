import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCount, removeItem } from '../../store/cart'

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item.count);
  const myPlant = useSelector((state) => state.plants.allPlants[item.id]);
  // const thisPlant = useSelector((state) => state.plants.singlePlant);

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  // console.log(item)

  return (
    <li className="cart-item">
      <div className="cart-item-header">{myPlant.name}</div>
      <div className="cart-item-header">${myPlant.price.toFixed(2)}</div>
      <img className="preview-image-div" src={myPlant.preview_image_url} alt={myPlant.name} />
      <div className="cart-item-menu">
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          onBlur={() => dispatch(updateCount(myPlant.id, Number(count)))}
        />
        <button
          className="cart-item-button"
          onClick={() => dispatch(updateCount(myPlant.id, item.count + 1))}
        >
          +
        </button>
        <button
          className="cart-item-button"
          onClick={() => dispatch(updateCount(myPlant.id, item.count - 1))}
        >
          -
        </button>
        <button
          className="cart-item-button"
          onClick={() => dispatch(removeItem(item.id))}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
