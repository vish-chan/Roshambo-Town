import * as ActionTypes from './ActionTypes';
import { MAX_WALK_INDEX, DOWN, SPRITE_LOC_DOWN } from '../helpers/constants';


export const Player = (state = { 
                                position: [0, 0],
                                direction: null,
                                spriteLocation: null,
                                isAnimating: false,
                                nextPosition: [],
                                walkIndex: 0,
                                }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return({...state, position:action.payload.player.position, direction: DOWN, spriteLocation: SPRITE_LOC_DOWN});
        case ActionTypes.UPDATE_PLAYER_POSITION:
            return({...state, position: action.payload.position, walkIndex: (state.walkIndex+1)%MAX_WALK_INDEX});
        case ActionTypes.UPDATE_PLAYER_DIRECTION:
                return({...state, direction: action.payload.direction, 
                        spriteLocation: action.payload.spriteLocation});
        case ActionTypes.UPDATE_PLAYER_ANIMATION:
                return({...state, isAnimating: action.payload.isAnimating, nextPosition: action.payload.newpos, walkIndex: 0});
        default: 
            return state;
    }
}