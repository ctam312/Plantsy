import { useSelector, useDispatch } from 'react-redux';
import { getAllCartItems, reset } from '../../store/cart'
import CartItem from './CartItem';
import './Cart.css';
import { useEffect, useState } from 'react';
import { getAllPlantsThunk} from '../../store/plants';
import { useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  const cartItems = useSelector(getAllCartItems);
  const cartItemsState = useSelector(state => state.cart)
  const allPlants = useSelector((state) => state.plants.allPlants);

  const localStorageState = JSON.parse(localStorage.getItem('cartData'));
  const newCartItems = localStorageState && localStorageState.items ? Object.values(localStorageState.items) : [];

  const [storage, setStorage] = useState([])
  const totalQuantity = storage.reduce((total, item) => total + item.count, 0);
  const totalPrice = storage.reduce((total, item) => total + (item.count * allPlants[item.id]?.price), 0);

  useEffect(() => {
    if (Object.keys(cartItemsState.items).length === 0) {
      setStorage(newCartItems)
      dispatch(getAllPlantsThunk())
    } else {
      localStorage.setItem('cartData', JSON.stringify(cartItemsState))
      const localStorageState = JSON.parse(localStorage.getItem('cartData'))
      setStorage(Object.values(localStorageState.items))
      dispatch(getAllPlantsThunk())
    }

  }, [cartItemsState, dispatch])



  if (!storage || !storage.length) return (
    <div className="no-item cart-container">
      <h2>No items in the cart. Start selecting items to purchase.</h2>
    </div>
  );


  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(
      "Purchased the following:\n" +
      `${cartItems.map(item => `${item.count} of ${item.name}`).join('\n')}`
    );
    dispatch(reset());
  }

  const onCheckout = () => {
    if (!sessionUser) {
      <OpenModalButton
        className="log-in-demo-button cart-checkout-btn"
        buttonText="Please Log In"
        modalComponent={<LoginFormModal />}
      />
    } else {
      dispatch(reset());
      localStorage.clear();
      alert('Thank you for your purchase! Your items will be on its way!');
      history.push('/')
    }
  }

  return (
    <div className="cart-container">
      <div>
        {storage.map(item => <CartItem key={item.id} item={item}/>)}
      </div>
      <hr />
      {/* <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form> */}
      <div>
        {/* {storage.map(item => allPlants[item.id])} */}
        <div className='quantity-price-checkout-container'>
          <div>
            <h2>Total</h2>
            <p>Total quantity: {totalQuantity}</p>
            <p>Total price: ${totalPrice.toFixed(2)}</p>
          </div>
          {sessionUser ? <button className= "log-in-demo-button cart-checkout-btn" onClick={onCheckout}>Proceed to checkout</button> :
                <OpenModalButton
                className="log-in-demo-button cart-checkout-btn"
                buttonText="Please Log In"
                modalComponent={<LoginFormModal />}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default Cart;
