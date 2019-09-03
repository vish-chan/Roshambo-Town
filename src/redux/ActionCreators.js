import * as ActionTypes from './ActionTypes';
import { TOTAL_MOVEMENT_SIZE, FRAME_MOVEMENT_SIZE, VIEWPORT_BOUNDARY, LEFT, RIGHT, UP, DOWN, 
        SPRITE_LOC_LEFT, SPRITE_LOC_RIGHT, SPRITE_LOC_DOWN, SPRITE_LOC_UP, ANIMATION_STEPS, SPRITE_SIZE,
        PLAYER_START_POS, 
        VIEWPORT_WIDTH,
        VIEWPORT_HEIGHT, CAMERA} from '../helpers/constants';
import { store } from '../redux/ConfigureStore';

let oldpos = [];
let newpos = [];
let mapstart = [];
let mapend = [];
let direction;
let spriteLocation, steps = ANIMATION_STEPS;

const observeBoundaries = (newpos) => {
    return (newpos[0]>=0 && newpos[0]<=VIEWPORT_BOUNDARY[0] - SPRITE_SIZE) &&
            (newpos[1]>=0 && newpos[1]<=VIEWPORT_BOUNDARY[1] - SPRITE_SIZE);
}

const observeImpassible = (tiles, mapstart, newpos) => {
    const col = newpos[0]/SPRITE_SIZE + (-1*mapstart[0])/SPRITE_SIZE, row = newpos[1]/SPRITE_SIZE + (-1*mapstart[1])/SPRITE_SIZE;
    return (tiles[row][col]===0);
}

const observeCamera = (oldpos, direction) => {
    if(direction===LEFT || direction===RIGHT)
        return (oldpos[0] >= CAMERA[0][0]) && (oldpos[0] <= CAMERA[0][1])
    else if(direction===UP || direction===DOWN)
        return (oldpos[1] >= CAMERA[1][0]) && (oldpos[1] <= CAMERA[1][1])
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

const getNewStart = (start, direction, movementSize) => {
    switch(direction) {
        case LEFT:
            return [start[0]+movementSize, start[1]];
        case RIGHT:
            return [start[0]-movementSize, start[1]];
        case UP:
            return [start[0], start[1] + movementSize];
        case DOWN:
            return [start[0], start[1] - movementSize];
    }
}


const animatePlayer = () => {
    if(steps === 0) {
        store.dispatch(UpdatePlayerAnimationAction(false));
        return;
    } 
    newpos = getNewPostion(oldpos, direction, FRAME_MOVEMENT_SIZE);
    store.dispatch(UpdatePlayerPositionAction(newpos));
    oldpos = newpos;
    steps--;
    requestAnimationFrame(animatePlayer);
}

const animatePlayerOnSpot = () => {
    if(steps === 0) {
        store.dispatch(UpdatePlayerAnimationAction(false));
        return;
    } 
    store.dispatch(UpdatePlayerPositionAction(oldpos));
    mapstart = getNewStart(mapstart, direction, FRAME_MOVEMENT_SIZE);
    store.dispatch(UpdateOriginAction(mapstart));
    steps--;
    requestAnimationFrame(animatePlayerOnSpot);
}


export const UpdatePlayerPosition = (keyCode) => (dispatch, getState) => {
    steps = ANIMATION_STEPS;
    oldpos = getState().player.position;
    mapstart = getState().map.viewport.start;
    mapend = getState().map.viewport.end;

    if(keyCode === 37) {
        direction = LEFT;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_LEFT;
    } else if(keyCode === 39) {
        direction = RIGHT;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_RIGHT;
    } else if(keyCode === 38) {
        direction = UP;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_UP;
    } else if(keyCode === 40) {
        direction = DOWN;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_DOWN;
    }

    if(getState().player.direction!==direction)
        dispatch(UpdatePlayerDirectionAction(direction, spriteLocation));

    if(observeBoundaries(newpos) && observeImpassible(getState().map.tiles, mapstart, newpos)) {
        if(direction === LEFT) {
            if(mapstart[0] < 0 && observeCamera(oldpos, direction)) {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayerOnSpot);
            } else {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayer);
            } 
        } else if(direction === UP) {
            if(mapstart[1] < 0 && observeCamera(oldpos, direction)) {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayerOnSpot);
            } else {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayer);
            }
        } else if(direction === RIGHT) {
            if(mapend[0] > VIEWPORT_WIDTH && observeCamera(oldpos, direction)) {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayerOnSpot);
            } else {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayer);
            } 
        } else if(direction === DOWN) {
            if(mapend[1] > VIEWPORT_HEIGHT && observeCamera(oldpos, direction)) {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayerOnSpot);
            } else {
                dispatch(UpdatePlayerAnimationAction(true));
                requestAnimationFrame(animatePlayer);
            }
        }
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


export const UpdateOriginAction = (origin) => {
    return({
        type: ActionTypes.UPDATE_MAP_ORIGIN,
        payload: {
            origin},
    });
}


export const AddMapAction = (map) => { 
    let width = map.tiles[0].length*SPRITE_SIZE;
    let height= map.tiles.length*SPRITE_SIZE;
    let start = [0-((width/2)-PLAYER_START_POS[0]) + SPRITE_SIZE, 0-((height/2)-PLAYER_START_POS[1]) + SPRITE_SIZE];
    let end = [start[0]+width, start[1]+height];
    return({
        type: ActionTypes.ADD_MAP,
        payload: {
            tiles: map.tiles,
            width,
            height,
            viewport: {
                start,
                end,
            }
        },
    });
}