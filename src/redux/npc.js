import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import {TILE_SIZE } from '../helpers/constants';


export const NPC = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return(
                action.payload.npc.map( npc => {
                    return({...npc, 
                            position: tileToMapCoordinates(npc.position, TILE_SIZE),
                            spriteLocation: npc.skin[npc.direction],
                            isAnimating: false,
                            nextPosition: [],
                            walkIndex: 0, 
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
                            let pathIdx = npc.pathIdx;
                            let pathDir = npc.pathDir;
                            if(!action.payload.isAnimating) {
                                pathIdx = pathIdx + pathDir;
                                if(pathDir===1 && pathIdx===(npc.pathArr.length-1)) {
                                    pathDir = -1;
                                } else if(pathDir===-1 && pathIdx===0) {
                                    pathDir = 1;
                                }
                            }
                            return({...npc,  
                                    isAnimating: action.payload.isAnimating, 
                                    nextPosition: action.payload.newpos, 
                                    pathIdx: pathIdx, 
                                    pathDir: pathDir
                            });
                        } else
                            return npc;
                    })
                );
        default: 
            return state;
    }
}