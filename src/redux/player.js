import * as ActionTypes from './ActionTypes';
import { DOWN } from '../helpers/constants';


export const Player = (state = { 
                                name: null,
                                skin: {},
                                position: [0, 0],
                                direction: null,
                                spriteLocation: null,
                                isAnimating: false,
                                nextPosition: [],
                                walkIndex: 0,
                                }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return({...state, 
                    name: action.payload.player.name, 
                    skin: action.payload.player.skin, 
                    position:action.payload.player.position, 
                    direction: DOWN, 
                    spriteLocation: action.payload.player.skin["DOWN"],
                });
        case ActionTypes.UPDATE_PLAYER_POSITION:
            return({...state, 
                    position: action.payload.position, 
                    walkIndex: (state.walkIndex+1)%state.skin.walkSpriteCount});
        case ActionTypes.UPDATE_PLAYER_DIRECTION:
                return({...state, 
                        direction: action.payload.direction, 
                        spriteLocation: state.skin[action.payload.direction]
                        });
        case ActionTypes.UPDATE_PLAYER_ANIMATION:
                return({...state, 
                        isAnimating: 
                        action.payload.isAnimating, 
                        nextPosition: action.payload.newpos, 
                        walkIndex: 0});
        default: 
            return state;
    }
}