import * as ActionTypes from './ActionTypes';
import { DOWN } from '../helpers/constants';
import { getValue } from '../helpers/funcs';
import { SKINS } from '../data/skins';

const DEFAULT_DIALOG = "Hey! What's up?";

const INITIAL_STATE = { 
                        name: "PLAYER",
                        skin: SKINS["player_1"],
                        position: [0, 0],
                        direction: DOWN,
                        spriteLocation: SKINS["player_1"][DOWN],
                        isAnimating: false,
                        nextPosition: [],
                        walkIndex: 0,
                        frameInterval: 5,
                        interacting: false,
                        talk: [],
                        frozen: false,
                        nearbyNPC: null,
                        nearbyGameObj: null,
                        nearbyPortal: null,
                        inBattle: false,
                        battle: {
                                level: 1,
                                exp: 0,
                                won: 0,
                                lost: 0,
                        }
        };


export const Player = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
                return({
                        ...state, 
                        position: action.payload.player.position, 
                        direction: getValue(state.direction, action.payload.player.direction),
                        spriteLocation: state.skin[getValue(state.direction, action.payload.player.direction)],
                        isAnimating: false,
                        nextPosition: [],
                        walkIndex: 0,
                        interacting: false,
                        talk: action.payload.player.talk.map(talk => talk? talk: [DEFAULT_DIALOG]),
                        frozen: false,
                        inBattle: false,
                        nearbyNPC: null,
                        nearbyGameObj: null,
                        nearbyPortal: null,
                });
        case ActionTypes.SET_PLAYER_INFO:
                return({
                        ...state,
                        name: action.payload.name,
                        skin: SKINS[action.payload.skinIdx],

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
                        battle: {...state.battle},
                        frozen: false,
                });
        case ActionTypes.RESTORE_STATE_FROM_DISK:
                return({
                        ...action.payload.state.player,
                                frozen: false,
                });
        case ActionTypes.UPDATE_NEARBY_NPC: 
                return({
                        ...state,
                        nearbyNPC: action.payload.npcId,
                });
        case ActionTypes.UPDATE_NEARBY_GAMEOBJ: 
                return({
                        ...state,
                        nearbyGameObj: action.payload.id,
                });
        case ActionTypes.UPDATE_NEARBY_PORTAL: 
                return({
                        ...state,
                        nearbyPortal: action.payload.id,
                });
        case ActionTypes.START_BATTLE:
                return({
                        ...state,
                        inBattle: true,
                });
        case ActionTypes.END_BATTLE:
                return({
                        ...state,
                        inBattle: false,
                        battle: {
                                level: action.payload.player.newlevel,
                                exp: action.payload.player.newexp,
                                won: action.payload.battleWinner===1? state.battle.won+1: state.battle.won,
                                lost: action.payload.battleWinner===-1? state.battle.lost+1: state.battle.lost,
                        },
                });
        default: 
            return state;
    }
}