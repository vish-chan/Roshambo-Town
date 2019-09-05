import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import { MAX_WALK_INDEX, TILE_SIZE, SPRITE_LOC_DOWN } from '../helpers/constants';


export const NPC = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            const npcList = action.payload.npc;
            for(let i=0; i<npcList.length; i++) {
                npcList[i].id = i;
                npcList[i].position = tileToMapCoordinates(npcList[i].position, TILE_SIZE);
                npcList[i].spriteLocation = SPRITE_LOC_DOWN;    
                npcList[i].isAnimating = false;
                npcList[i].nextPosition = [];
                npcList[i].walkIndex = 0;        
            }
            return(npcList);
        case ActionTypes.UPDATE_NPC_POSITION:
            return({...state, position: action.payload.position, walkIndex: (state.walkIndex+1)%MAX_WALK_INDEX});
        case ActionTypes.UPDATE_NPC_DIRECTION:
                return({...state, direction: action.payload.direction, 
                        spriteLocation: action.payload.spriteLocation});
        case ActionTypes.UPDATE_NPC_ANIMATION:
                return({...state, isAnimating: action.payload.isAnimating, nextPosition: action.payload.newpos, walkIndex: 0});
        default: 
            return state;
    }
}