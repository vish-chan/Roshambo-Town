import * as ActionTypes from './ActionTypes';


export const Map = (state = { tiles: [] }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return({...state, tiles: action.payload.tiles});
        default: 
            return state;
    }
}