import * as ActionTypes from './ActionTypes';


export const Player = (state = { position: [0, 0] }, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_PLAYER_POSITION:
            return({...state, position: action.payload});
        default: 
            return state;
    }
}