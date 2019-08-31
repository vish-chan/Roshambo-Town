import * as ActionTypes from './ActionTypes';
import { MOVEMENT_SIZE, MAP_BOUNDARIES, LEFT, RIGHT, UP, DOWN, 
        SPRITE_LOC_LEFT, SPRITE_LOC_RIGHT, SPRITE_LOC_DOWN, SPRITE_LOC_UP, ANIMATION_STEPS } from '../helpers/constants';
import { store } from '../redux/ConfigureStore';

let oldpos = [];
let newpos = [];
let direction;
let spriteLocation, steps = ANIMATION_STEPS;

const observeBoundaries = (newpos) => {
    return (newpos[0]>=0 && newpos[0]<=MAP_BOUNDARIES[0]) &&
            (newpos[1]>=0 && newpos[1]<=MAP_BOUNDARIES[1]);
}

const observeImpassible = (tiles, newpos) => {
    const col = newpos[0]/40, row = newpos[1]/40;
    return (tiles[row][col]===0);
}

const getNewPostion = (oldpos, direction, movementSize) => {
    switch(direction) {
        case LEFT:
            return [oldpos[0]-movementSize, oldpos[1]];
        case RIGHT:
            return [oldpos[0]+movementSize, oldpos[1]];
        case UP:
            return [oldpos[0], oldpos[1] - movementSize];
        case DOWN:
            return [oldpos[0], oldpos[1] + movementSize];
    }
}


const animatePlayer = () => {
    if(steps === 0) {
        store.dispatch(UpdatePlayerAnimationAction(false));
        return;
    } 
    newpos = getNewPostion(oldpos, direction, 5);
    store.dispatch(UpdatePlayerPositionAction(newpos));
    oldpos = newpos;
    steps--;
    requestAnimationFrame(animatePlayer);
}


export const UpdatePlayerPosition = (keyCode) => (dispatch, getState) => {
    steps = ANIMATION_STEPS;
    oldpos = getState().player.position;

    if(keyCode === 37) {
        direction = LEFT;
        newpos = getNewPostion(oldpos, direction, MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_LEFT;
    } else if(keyCode === 39) {
        direction = RIGHT;
        newpos = getNewPostion(oldpos, direction, MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_RIGHT;
    } else if(keyCode === 38) {
        direction = UP;
        newpos = getNewPostion(oldpos, direction, MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_UP;
    } else if(keyCode === 40) {
        direction = DOWN;
        newpos = getNewPostion(oldpos, direction, MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_DOWN;
    }

    if(getState().player.direction!=direction)
        dispatch(UpdatePlayerDirectionAction(direction, spriteLocation));

    if(observeBoundaries(newpos) && observeImpassible(getState().map.tiles, newpos)) {
        dispatch(UpdatePlayerAnimationAction(true));
        requestAnimationFrame(animatePlayer);
    }
}

const UpdatePlayerAnimationAction = (isAnimating) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_ANIMATION,
        payload: {
            isAnimating,
        }
    });
}

const UpdatePlayerPositionAction = (position) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_POSITION,
        payload: {
            position,
        }
    });
}

const UpdatePlayerDirectionAction = (direction, spriteLocation) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_DIRECTION,
        payload: {
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