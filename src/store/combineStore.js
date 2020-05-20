import {combineReducers} from 'redux';
import auth from './reducers/Auth';
import register from './reducers/Register';

export default combineReducers({
    auth,
    register,
})
