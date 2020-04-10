import {combineReducers} from 'redux';
import user from './user/reducer';
import todos from './todos/reducer';


export default combineReducers({user, todos});
