import { useSelector, useDispatch } from 'react-redux';
import { getAllCartItems, reset } from '../../store/cart'
import CartItem from './CartItem';
import './Cart.css';
import { useEffect, useState } from 'react';
import { getAllPlantsThunk, getPlantDetailsThunk } from '../../store/plants';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(getAllCartItems);
  const cartItemsState = useSelector(state => state.cart)
  const allPlants = useSelector((state) => state.plants.allPlants);
  
  const localStorageState = JSON.parse(localStorage.getItem('cartData'))
  const newCartItems = Object.values(localStorageState.items)
  // console.log("NEW CART ITEMSSSS ========>", newCartItems)
  // console.log("===========================>", localStorageState)
  
  const [storage, setStorage] = useState([])
  const totalQuantity = storage.reduce((total, item) => total + item.count, 0);
  const totalPrice = storage.reduce((total, item) => total + (item.count * allPlants[item.id]?.price), 0);
  
  useEffect(() => {
    console.log('this the state fr', cartItemsState)
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
        {storage.map(item => <CartItem key={item.id} item={item}/>)}
      </ul>
      <hr />
      {/* <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form> */}

      <h1>Total</h1>
      {/* {storage.map(item => allPlants[item.id])} */}
      <p>Total quantity: {totalQuantity}</p>
    <p>Total price: ${totalPrice.toFixed(2)}</p>
    </div>
  )
}

export default Cart;
