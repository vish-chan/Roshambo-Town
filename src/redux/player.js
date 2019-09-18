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
                        frozen: false,
                        inBattle: false,
                        nearbyNPC: null,
        };


export const Player = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
                return({...state, 
                        name: action.payload.player.name, 
                        skin: action.payload.player.skin, 
                        position:action.payload.player.position, 
                        frameInterval: action.payload.player.frameInterval,
                        direction: DOWN,
                        spriteLocation: action.payload.player.skin[DOWN],
                        isAnimating: false,
                        nextPosition: [],
                        walkIndex: 0,
                        interacting: false,
                        talk: action.payload.player.talk.map(talk => talk? talk: [DEFAULT_DIALOG]),
                        frozen: false,
                        inBattle: false,
                        nearbyNPC: null,
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
        
        case ActionTypes.SAVE_STATE_INITIATED:
                return({
                        ...state,
                        frozen: true,
                });
        case ActionTypes.SAVE_STATE_END:
                return({
                        ...state,
                        frozen: false,
                });

        case ActionTypes.RESTORE_STATE:
                return({
                        ...action.payload.state.player,
                        frozen: false,
                });
        case ActionTypes.UPDATE_NEARBY_NPC: 
                return({
                        ...state,
                        nearbyNPC: action.payload.npcId,
                });
        default: 
            return state;
    }
}