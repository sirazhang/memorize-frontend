import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './combineStore';

const cfgStore = () => {
    return createStore(
        reducers,
        applyMiddleware(thunk)
    )
};

export default cfgStore;
