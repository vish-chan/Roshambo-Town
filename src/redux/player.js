import * as ActionTypes from './ActionTypes';
import { DOWN } from '../helpers/constants';

const DEFAULT_DIALOG = "Hey! What's up?";

const INITIAL_STATE = { 
                        name: null,
                        skin: {},
                        position: [0, 0],
                        direction: DOWN,
                        spriteLocation: null,
                        isAnimating: false,
                        nextPosition: [],
                        walkIndex: 0,
                        frameInterval: 0,
                        interacting: false,
                        talk: [],
                        inventory: {
                                HEALER : [],
                                CURRENCY: [],
                                EATABLE: [],
                        },
        };


export const Player = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
                return({...state, 
                        name: action.payload.player.name, 
                        skin: action.payload.player.skin, 
                        position:action.payload.player.position, 
                        frameInterval: action.payload.player.frameInterval,
                        spriteLocation: action.payload.player.skin[DOWN],
                        talk: action.payload.player.talk.map(talk => talk? talk: [DEFAULT_DIALOG]),
                });
        case ActionTypes.UPDATE_PLAYER_POSITION:
                return({...state, 
                        position: action.payload.position, 
                        walkIndex: (state.walkIndex+1)%state.skin.walkSpriteCount
                });
        case ActionTypes.UPDATE_PLAYER_DIRECTION:
                return({...state, 
                        direction: action.payload.direction, 
                        spriteLocation: state.skin[action.payload.direction]
                });
        case ActionTypes.UPDATE_PLAYER_ANIMATION:
                return({...state, 
                        isAnimating: action.payload.isAnimating, 
                        nextPosition: action.payload.newpos, 
                        walkIndex: 0
                });
        case ActionTypes.SET_DIALOG_STATUS:
                return({
                        ...state,
                        interacting: true,
                });
        case ActionTypes.RESET_DIALOG_STATUS:
                return({
                        ...state,
                        interacting: false,
                });
        case ActionTypes.ADD_OBJECT_TO_INVENTORY:
                let inventoryCpy =  Object.assign({}, state.inventory);
                inventoryCpy[action.payload.object.type.type] =  inventoryCpy[action.payload.object.type.type].concat(action.payload.object);
                return({
                        ...state,
                        inventory: inventoryCpy,
                });
        default: 
            return state;
    }
}