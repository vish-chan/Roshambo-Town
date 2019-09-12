import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import {TILE_SIZE } from '../helpers/constants';


export const GameObject = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            let id=0;
            if(!action.payload.gameobjects)
                return state;
            return(
                action.payload.gameobjects.map( gameobject => {
                    return({...gameobject, 
                            id: id++,
                            position: tileToMapCoordinates(gameobject.position, TILE_SIZE),
                    })
                })
            );
        case ActionTypes.ADD_OBJECT_TO_INVENTORY:
            return(state.filter( gameobject => (gameobject.id !== action.payload.object.id)));

        case ActionTypes.RESTORE_STATE:
            return(
                action.payload.state.gameobjects
            );

        default: 
            return state;
    }
}