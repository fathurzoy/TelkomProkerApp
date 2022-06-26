import {combineReducers} from 'redux';
import {registerReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';
import {orderReducer} from './order';

const reducer = combineReducers({
  registerReducer,
  globalReducer,
  homeReducer,
  orderReducer,
});

export default reducer;
