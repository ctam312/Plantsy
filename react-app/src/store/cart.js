const ADD_ITEM = 'cart/ADD_ITEM';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';
const UPDATE_COUNT = 'cart/UPDATE_COUNT';
const RESET = 'cart/RESET';

/* ----- ACTIONS ------ */

export const addItem = (itemId) => {
  return {
    type: ADD_ITEM,
    itemId
  };
};

export const updateCount = (itemId, count) => {
  if (count < 1) return removeItem(itemId);
  // console.log('THIS IT ITEM ID', itemId)
  return {
    type: UPDATE_COUNT,
    itemId,
    count
  };
};

export const removeItem = (itemId) => {
  return {
    type: REMOVE_ITEM,
    itemId
  };
};

export const reset = () => {
  return {
    type: RESET
  };
};

/* ------ SELECTORS ------ */

export const getAllCartItems = ({ cart, plants }) => {
  // console.log('cart --> ', cart)
  // console.log('plants -----> ',plants)
  return Object.values(cart.order).map((id) => {
    return {
      ...cart.items[id],
      ...plants[id],
    };
  });
};

// export const getAllCartItems = (state) => {
//   return state.cart.order.map((id) => {
//     return {
//       ...state.cart.items[id],
//       ...state.produce[id],
//     };
//   });
// };

export const getCartItemById = (id) => (state) => state.cart.items[id];

export const getCartOrder = (state) => state.cart.order;

/* ------ REDUCER ------ */

const initialState = {
  items: {},
  order: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      const newStateAdd = {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: {
            id: action.itemId,
            count: 1,
          },
        },
        order: [...state.order, action.itemId],
      }
      localStorage.setItem('cartData', JSON.stringify(newStateAdd))
      return newStateAdd;
    case UPDATE_COUNT:
      // console.log('tin brings the..', action)
      return {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: {
            ...state[action.itemId],
            count: action.count,
            id: action.itemId
          },
        },
        order: [...state.order, action.itemId],
      };
    case REMOVE_ITEM:
      const newState = { ...state, items: { ...state.items }};
      // console.log('this is the newstate', newState)
      // console.log('STATE BOYS ', state)
      // console.log('THIS IS THE ULTIMATE ACTION', action.itemId)
      // console.log('THE ORDER MUST BE GOOD', newState.order)
      delete newState.items[action.itemId];
      newState.order = newState.order.filter(id => id !== action.itemId.toString());
      localStorage.setItem('cartData', JSON.stringify(newState))
      return newState;

    case RESET:
      return initialState;
    default:
      return state;
  }
}

// const initialState = JSON.parse(window.localStorage.getItem('cart')) || {};

// const cartReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case ADD_ITEM: {
// 			const newState = { ...state };
// 			newState[action.id] = { id: action.id, count: 1 };
// 			window.localStorage.setItem('cart', JSON.stringify(newState));
// 			return newState;
// 		}
// 		case REMOVE_ITEM: {
// 			const newState = { ...state };
// 			delete newState[action.id];
// 			window.localStorage.setItem('cart', JSON.stringify(newState));
// 			return newState;
// 		}
// 		case UPDATE_COUNT: {
// 			const newState = { ...state };
// 			newState[action.id].count = action.count;
// 			window.localStorage.setItem('cart', JSON.stringify(newState));
// 			return newState;
// 		}
// 		case RESET: {
// 			const newState = {};
// 			window.localStorage.setItem('cart', JSON.stringify(newState));
// 			return newState;
// 		}
// 		default:
// 			return state;
// 	}
// };

// export default cartReducer;
