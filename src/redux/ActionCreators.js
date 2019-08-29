import * as ActionTypes from './ActionTypes';
import { MOVEMENT_SIZE, MAP_BOUNDARIES } from '../helpers/constants';



const observeBoundaries = (newpos) => {
    return (newpos[0]>=0 && newpos[0]<=MAP_BOUNDARIES[0]) &&
            (newpos[1]>=0 && newpos[1]<=MAP_BOUNDARIES[1]) ? true : false;
}

const observeImpassible = (tiles, newpos) => {
    const col = newpos[0]/40, row = newpos[1]/40;
    return (tiles[row][col]===0? true : false);
}

export const UpdatePlayerPosition = (keyCode) => (dispatch, getState) => {
    let oldpos = getState().player.position;
    let newpos = [oldpos[0], oldpos[1]];
    if(keyCode === 37) {
        newpos[0] = newpos[0]-MOVEMENT_SIZE;
    } else if(keyCode === 39) {
        newpos[0] = newpos[0]+MOVEMENT_SIZE;
    } else if(keyCode === 38) {
        newpos[1] = newpos[1]-MOVEMENT_SIZE;
    } else if(keyCode === 40) {
        newpos[1] = newpos[1]+MOVEMENT_SIZE;
    }
    if(observeBoundaries(newpos)) {
        if(observeImpassible(getState().map.tiles, newpos)) {
            return (dispatch(UpdatePlayerPositionAction(newpos)));
        }
    }
}

export const UpdatePlayerPositionAction = (position) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_POSITION,
        payload: position,
    });
}

export const AddMapAction = (map) => {
    return({
        type: ActionTypes.ADD_MAP,
        payload: map,
    });
}