import {combineReducers} from 'redux';
import auth from './reducers/Auth';
import register from './reducers/Register';
import reset from './reducers/ResetPassword';
import send_email_reset from './reducers/SendEmailReset';
import word_data from './reducers/WordData';
import latitude from './reducers/Latitude';
import longitude from './reducers/Longitude';

export default combineReducers({
    auth,
    register,
    reset,
    send_email_reset,
    word_data,
    latitude,
    longitude,
})
