import * as ActionTypes from './ActionTypes';
import { DOWN, SPRITE_LOC_DOWN } from '../helpers/constants';


export const Player = (state = { 
                                position: [0, 0],
                                direction: DOWN,
                                spriteLocation: SPRITE_LOC_DOWN,
                                isAnimating: false,
                                }, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_PLAYER_POSITION:
            return({...state, position: action.payload.position});
        case ActionTypes.UPDATE_PLAYER_DIRECTION:
                return({...state, direction: action.payload.direction, 
                        spriteLocation: action.payload.spriteLocation});
        case ActionTypes.UPDATE_PLAYER_ANIMATION:
                return({...state, isAnimating: action.payload.isAnimating});
        default: 
            return state;
    }
}