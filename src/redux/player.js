import * as ActionTypes from './ActionTypes';
import { DOWN, SPRITE_LOC_DOWN } from '../helpers/constants';


export const Player = (state = { 
                                position: [0, 0],
                                direction: DOWN,
                                spriteLocation: SPRITE_LOC_DOWN
                                }, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_PLAYER_POSITION:
            return({...state, position: action.payload.position, direction: action.payload.direction, 
                    spriteLocation: action.payload.spriteLocation});
        default: 
            return state;
    }
}