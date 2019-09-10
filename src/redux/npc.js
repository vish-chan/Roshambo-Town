import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import {TILE_SIZE } from '../helpers/constants';

const DEFAULT_DIALOG = ["Ehhh! Leave me alone!"];

export const NPC = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            if(!action.payload.npc)
                return state;
            return(
                action.payload.npc.map( npc => {
                    return({...npc, 
                            position: tileToMapCoordinates(npc.position, TILE_SIZE),
                            spriteLocation: npc.skin[npc.direction],
                            isAnimating: false,
                            nextPosition: [],
                            walkIndex: 0,
                            lastUpdated: performance.now(),
                            isWaiting: false,
                            interacting: false,
                            talk: npc.talk? npc.talk: DEFAULT_DIALOG,
                    })
                })
            );
        case ActionTypes.UPDATE_NPC_POSITION:
                return(
                    state.map( npc => {
                        if(npc.id===action.payload.id)
                            return({...npc, 
                                    position: action.payload.position, 
                                    walkIndex: (npc.walkIndex+1)%npc.skin.walkSpriteCount,
                            });
                        else
                            return npc;
                    })
                );
        case ActionTypes.UPDATE_NPC_DIRECTION:
                return(
                    state.map( npc => {
                        if(npc.id===action.payload.id)
                            return({...npc,  
                                    direction: action.payload.direction, 
                                    spriteLocation: npc.skin[action.payload.direction]
                                });
                        else
                            return npc;
                    })
                );

        case ActionTypes.UPDATE_NPC_ANIMATION:
                return(
                    state.map( npc => {
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
                );
        case ActionTypes.RESET_NPC_WAITING:
                return(
                    state.map( npc => {
                        if(npc.id===action.payload.id)
                            return({...npc,  
                                    isWaiting: false,
                                });
                        else
                            return npc;
                    })
                );
        case ActionTypes.SET_DIALOG_STATUS:
                return(
                    state.map( npc => {
                        if(npc.id===action.payload.npcId)
                            return({...npc,  
                                    interacting: true,
                                });
                        else
                            return npc;
                    })
                );
        case ActionTypes.RESET_DIALOG_STATUS:
                    return(
                        state.map( npc => {
                            if(npc.id===action.payload.npcId)
                                return({...npc,  
                                        interacting: false,
                                    });
                            else
                                return npc;
                        })
                    );
        default: 
            return state;
    }
}