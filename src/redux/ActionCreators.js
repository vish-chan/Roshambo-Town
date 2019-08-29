import * as ActionTypes from './ActionTypes';
import { MOVEMENT_SIZE, MAP_BOUNDARIES, LEFT, RIGHT, UP, DOWN, 
        SPRITE_LOC_LEFT, SPRITE_LOC_RIGHT, SPRITE_LOC_DOWN, SPRITE_LOC_UP } from '../helpers/constants';



const observeBoundaries = (newpos) => {
    return (newpos[0]>=0 && newpos[0]<=MAP_BOUNDARIES[0]) &&
            (newpos[1]>=0 && newpos[1]<=MAP_BOUNDARIES[1]);
}

const observeImpassible = (tiles, newpos) => {
    const col = newpos[0]/40, row = newpos[1]/40;
    return (tiles[row][col]===0);
}

const getNewPostion = (oldpos, direction) => {
    switch(direction) {
        case LEFT:
            return [oldpos[0]-MOVEMENT_SIZE, oldpos[1]];
        case RIGHT:
            return [oldpos[0]+MOVEMENT_SIZE, oldpos[1]];
        case UP:
            return [oldpos[0], oldpos[1] - MOVEMENT_SIZE];
        case DOWN:
            return [oldpos[0], oldpos[1] + MOVEMENT_SIZE];
    }
}

export const UpdatePlayerPosition = (keyCode) => (dispatch, getState) => {
    let oldpos = getState().player.position;
    let newpos = [];
    let direction;
    let spriteLocation;
    if(keyCode === 37) {
        direction = LEFT;
        newpos = getNewPostion(oldpos, direction);
        spriteLocation = SPRITE_LOC_LEFT;
    } else if(keyCode === 39) {
        direction = RIGHT;
        newpos = getNewPostion(oldpos, direction);
        spriteLocation = SPRITE_LOC_RIGHT;
    } else if(keyCode === 38) {
        
        direction = UP;
        newpos = getNewPostion(oldpos, direction);
        spriteLocation = SPRITE_LOC_UP;
    } else if(keyCode === 40) {
        
        direction = DOWN;
        newpos = getNewPostion(oldpos, direction);
        spriteLocation = SPRITE_LOC_DOWN;
    }
    
    
    if(observeBoundaries(newpos)) {
            if(observeImpassible(getState().map.tiles, newpos)) {
                return (dispatch(UpdatePlayerPositionAction(newpos, direction, spriteLocation)));
            }
    }
    
}

export const UpdatePlayerPositionAction = (position, direction, spriteLocation) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_POSITION,
        payload: {
            position,
            direction,
            spriteLocation,
        }
    });
}

export const AddMapAction = (map) => {
    return({
        type: ActionTypes.ADD_MAP,
        payload: map,
    });
}