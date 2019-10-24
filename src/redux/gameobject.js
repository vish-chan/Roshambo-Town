import * as ActionTypes from './ActionTypes';
import {tileToMapCoordinates} from '../helpers/funcs';
import {TILE_SIZE, PORTAL_ENTER } from '../helpers/constants';


export const GameObject = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.START_NEW_JOURNEY:
            return([]);
            
        case ActionTypes.ADD_MAP:
            let id=0;
            if(!action.payload.gameobjects)
                return state;
            return(
                action.payload.gameobjects.map( gameobject => {
                    return({...gameobject, 
                            id: id++,
                            position: tileToMapCoordinates(gameobject.position, TILE_SIZE),
                            enabled: gameobject.type && gameobject.type.name===PORTAL_ENTER?false: true,
                    })
                })
            );
        case ActionTypes.ADD_OBJECT_TO_INVENTORY:
            return(state.filter( gameobject => (gameobject.id !== action.payload.object.id)));
        
        case ActionTypes.ENABLE_PORTAL:
            return(state.map( gameobject => {
                if(gameobject.type && gameobject.type.name===PORTAL_ENTER && gameobject.target.name===action.payload.portalname) {
                    return({
                        ...gameobject,
                        enabled: true,
                    });
                } else 
                    return gameobject;
            }));

        case ActionTypes.RESTORE_STATE:
            return(
                action.payload.state.gameobjects.concat()
            );
        case ActionTypes.RESTORE_STATE_FROM_DISK:
            return(
                    action.payload.state.gameobjects.concat()
            );

        default: 
            return state;
    }
}