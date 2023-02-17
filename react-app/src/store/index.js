import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import plantsReducer from './plants'
import reviewReducer from './reviewReducer'
import searchReducer from './SearchReducer';
import cartReducer from './cart';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  session,
  plants: plantsReducer,
  reviews: reviewReducer,
  search: searchReducer,
  cart: cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'cart'
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// const configureStore = (preloadedState) => {
//   return createStore(persistedReducer, preloadedState, enhancer);
// };

// export default configureStore;

const store = createStore(
  persistedReducer,
  enhancer
)

let persistor = persistStore(store)

export {
  store,
  persistor
}
