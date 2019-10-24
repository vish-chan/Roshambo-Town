import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import {TILE_SIZE } from '../helpers/constants';

const INITIAL_STATE = {
    list:  [],
    frozen: false,
  }

export const NPC = (state = {...INITIAL_STATE}, action) => {
    switch(action.type) {

        case ActionTypes.START_NEW_JOURNEY:
            return({
                ...INITIAL_STATE,
            });

        case ActionTypes.ADD_MAP:
            if(!action.payload.npc)
                return state;
            return(
                { 
                    frozen: false,
                    list :action.payload.npc.map( npc => {
                        return({...npc, 
                                position: tileToMapCoordinates(npc.pathArr[0], TILE_SIZE),
                                spriteLocation: npc.skin[npc.direction],
                                defaultDirection: npc.direction,
                                isAnimating: false,
                                nextPosition: [],
                                walkIndex: 0,
                                pathIdx: 0,
                                pathDir: 1,
                                lastUpdated: performance.now(),
                                isWaiting: false,
                                interacting: false,
                                battle: 'battle' in npc? npc.battle: false,
                                battlerType: 'battlerType' in npc? npc.battlerType: null,
                                inBattle: false,
                                battleFlag: 'battleFlag' in npc? npc.battleFlag : false,
                                defeatedCount: 'defeatedCount' in npc? npc.defeatedCount: 0,
                                talkFlag: 'talkFlag' in npc? npc.talkFlag: true,
                            })
                        })
                }
            );
        case ActionTypes.UPDATE_NPC_POSITION:
                return({
                    ...state,
                    list: state.list.map( npc => {
                            if(npc.id===action.payload.id)
                                return({...npc, 
                                        position: action.payload.position, 
                                        walkIndex: (npc.walkIndex+1)%npc.skin.walkSpriteCount,
                                });
                            else
                                return npc;
                    })
                });
                    
        case ActionTypes.UPDATE_NPC_DIRECTION:
                return({
                    ...state,
                    list: state.list.map( npc => {
                        if(npc.id===action.payload.id)
                            return({...npc,  
                                    direction: action.payload.direction, 
                                    spriteLocation: npc.skin[action.payload.direction]
                                });
                        else
                            return npc;
                    })
                });

        case ActionTypes.UPDATE_NPC_ANIMATION:
                return({
                    ...state,
                    list: state.list.map( npc => {
                        if(npc.id===action.payload.id) {
                            let pathIdx = npc.pathIdx, 
                                pathDir = npc.pathDir,
                                isWaiting = npc.isWaiting, lastUpdated = npc.lastUpdated;
                            
                            if(!action.payload.isAnimating) {
                                lastUpdated = performance.now();
                                pathIdx = pathIdx + pathDir;
                                if(pathDir===1 && pathIdx===(npc.pathArr.length-1)) {
                                    isWaiting = true;
                                    pathDir = -1;
                                } else if(pathDir===-1 && pathIdx===0) {
                                    isWaiting = true;
                                    pathDir = 1;
                                }
                            }
                            return({...npc,  
                                    isAnimating: action.payload.isAnimating, 
                                    nextPosition: action.payload.newpos, 
                                    pathIdx: pathIdx, 
                                    pathDir: pathDir,
                                    isWaiting: isWaiting,
                                    lastUpdated: lastUpdated
                            });
                        } else
                            return npc;
                    })
                });
                    
        case ActionTypes.RESET_NPC_WAITING:
                return({
                    ...state,
                    list: state.list.map( npc => {
                        if(npc.id===action.payload.id)
                            return({...npc,  
                                    isWaiting: false,
                                });
                        else
                            return npc;
                    })
                });
        case ActionTypes.SET_DIALOG_STATUS:
                return({
                    ...state,
                    list:  state.list.map( npc => {
                        if(npc.id===action.payload.npcId)
                            return({...npc,  
                                    interacting: true,
                                });
                        else
                            return npc;
                    })
                });
        case ActionTypes.RESET_DIALOG_STATUS:
                    return({
                        ...state,
                        list: state.list.map( npc => {
                            if(npc.id===action.payload.npcId)
                                return({...npc,  
                                        interacting: false,
                                        talkFlag: true,
                                    });
                            else
                                return npc;
                        })
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
                    list: action.payload.state.npc.list.map( npc => {
                        return({
                            ...npc,
                            isWaiting: false,
                        });
                    } ),
                    frozen: false,
                });
        case ActionTypes.RESTORE_STATE_FROM_DISK:
                return({
                    list: action.payload.state.npc.list.map( npc => {
                        return({
                            ...npc,
                            isWaiting: false,
                        });
                    } ),
                    frozen: false,
                });

        case ActionTypes.START_BATTLE:
                return({
                    ...state,
                    list:  state.list.map( npc => {
                        if(npc.id===action.payload.npc.id)
                            return({...npc,  
                                    inBattle: true,
                                });
                        else
                            return npc;
                    })
                });
        case ActionTypes.END_BATTLE:
                    return({
                        ...state,
                        list: state.list.map( npc => {
                            if(npc.id===action.payload.npcId)
                                return({...npc,  
                                        inBattle: false,
                                        defeatedCount: action.payload.battleWinner===1? npc.defeatedCount+1:npc.defeatedCount,
                                        battleFlag: true,
                                    });
                            else
                                return npc;
                        })
                    });
        case ActionTypes.ENABLE_PORTAL: 
                    return({
                        ...state,
                        list: state.list.map( npc => {
                            if(("enablesPortal" in npc) && npc.enablesPortal===action.payload.portalname)
                                return({...npc,  
                                        enablesPortal: null,
                                    });
                            else
                                return npc;
                        })
                    });
        default: 
            return state;
    }
}