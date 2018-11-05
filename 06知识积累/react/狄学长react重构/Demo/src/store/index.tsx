import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';

import { composeWithDevTools } from 'redux-devtools-extension';

const StoreConfig = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
}

const store = StoreConfig();

export default store;