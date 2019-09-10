import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import {TILE_SIZE } from '../helpers/constants';


export const GameObject = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            if(!action.payload.gameobjects)
                return state;
            return(
                action.payload.gameobjects.map( gameobject => {
                    return({...gameobject, 
                            position: tileToMapCoordinates(gameobject.position, TILE_SIZE),
                    })
                })
            );
        case ActionTypes.ADD_OBJECT_TO_INVENTORY:
            return(state.filter( gameobject => (gameobject.id !== action.payload.object.id)));
        default: 
            return state;
    }
}