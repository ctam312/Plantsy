
import { useSelector, useDispatch } from 'react-redux';
import { getAllCartItems, reset } from '../../store/cart'
import CartItem from './CartItem';
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(getAllCartItems);
  console.log('cart-item from cart -----> ', cartItems)
  const cartItemsState = useSelector(state => state.cart)
  console.log('state of the cart ---->', cartItemsState)

  const localStorageState = JSON.parse(localStorage.getItem('cartData'))
  console.log('localStorageState -----> ', localStorageState)
  if (!cartItems || !cartItems.length) return (
    <div className="cart">
      No items in the cart. Start selecting items to purchase.
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

  return (
    <div className="cart">
      <ul>
        {cartItems.map(item => <CartItem key={item.id} item={item}/>)}
      </ul>
      <hr />
      {/* <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form> */}
    </div>
  )
}

export default Cart;
