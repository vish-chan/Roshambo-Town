import * as ActionTypes from './ActionTypes';


export const Map = (state = { tiles: [],
                              width: 0,
                              height: 0,
                            }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return({...state, 
                    tiles: action.payload.tiles, 
                    width: action.payload.width,
                    height: action.payload.height,
                    });
        default: 
            return state;
    }
}