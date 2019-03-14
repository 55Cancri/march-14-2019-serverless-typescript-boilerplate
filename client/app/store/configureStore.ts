import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/auth';
// import { modalReducer } from '../reducers/modal';
// import { schoolReducer } from '../reducers/school';
// import { contactReducer } from '../reducers/contact';
// import { orderReducer } from '../reducers/order';
// import { invoiceReducer } from '../reducers/invoice';

// middleware is called every store update
const checkTokenExpirationMiddleware = store => next => action =>
// if (localStorage.q) {
//   const token = jwtDecode(localStorage.appJWT)

  //   if (token.exp < Date.now() / 1000) {
  //     next(action)
  //     store.dispatch(startLogout())
  //   }
  // }
  next(action);

// eslint-disable-next-line dot-notation
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export const configureStore = () =>
  createStore(
    combineReducers({
      // app: appReducer,
      auth: authReducer,
      // modal: modalReducer,
      // contact: contactReducer,
      // order: orderReducer,
      // invoice: invoiceReducer,
      // school: schoolReducer,
    }),
    composeEnhancers(applyMiddleware(thunk, checkTokenExpirationMiddleware)),
  )

  // original
  // return store
;

export default configureStore;
