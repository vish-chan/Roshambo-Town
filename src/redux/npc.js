import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import { MAX_WALK_INDEX, TILE_SIZE, SPRITE_LOC_DOWN } from '../helpers/constants';


export const NPC = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return(
                action.payload.npc.map( npc => {
                    return({...npc, 
                            position: tileToMapCoordinates(npc.position, TILE_SIZE),
                            spriteLocation: SPRITE_LOC_DOWN,
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
                                    walkIndex: (npc.walkIndex+1)%MAX_WALK_INDEX
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
                                    spriteLocation: action.payload.spriteLocation
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