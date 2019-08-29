import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Player } from './player';
import { Map } from './map';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    player : Player,
    map: Map,
});


export const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
}

