import * as ActionTypes from './ActionTypes';


export const Map = (state = { tiles: [],
                              width: 0,
                              height: 0,
                              canvas: null,
                              isLoading: true,
                            }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return({...state, 
                    tiles: action.payload.tiles, 
                    width: action.payload.width,
                    height: action.payload.height,
                    canvas: action.payload.canvas,
                    isLoading: false,
                    });
        case ActionTypes.MAP_LOADING:
            return({
                ...state,
                isLoading: true,
            });
        default: 
            return state;
    }
}