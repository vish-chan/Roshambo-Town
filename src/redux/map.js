import * as ActionTypes from './ActionTypes';


export const Map = (state = { tiles: [],
                              width: 0,
                              height: 0,
                              viewport: {
                                start: [0, 0],
                                end: []
                              }
                              }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return({...state, 
                    tiles: action.payload.tiles, 
                    width: action.payload.width,
                    height: action.payload.height,
                    viewport: {
                        start: action.payload.viewport.start,
                        end: action.payload.viewport.end,
                    }});
        case ActionTypes.UPDATE_MAP_ORIGIN:
            return({...state, viewport: {
                                    start: action.payload.origin,
                                    end: [action.payload.origin[0]+state.width, action.payload.origin[1]+state.height]}});
        default: 
            return state;
    }
}