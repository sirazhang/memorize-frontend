import {combineReducers} from 'redux';
import auth from './reducers/Auth';
import register from './reducers/Register';
import reset from './reducers/ResetPassword';
import send_email_reset from './reducers/SendEmailReset';

export default combineReducers({
    auth,
    register,
    reset,
    send_email_reset,
})
