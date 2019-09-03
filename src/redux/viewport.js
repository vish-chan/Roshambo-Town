import * as ActionTypes from './ActionTypes';


export const ViewPort = ( state = {start: [0, 0],
                                    end: [],
                                    width:0,
                                    height:0,
                             }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MAP:
            return({...state,
                        start: action.payload.viewport.start,
                        end: action.payload.viewport.end,
                        width:action.payload.width, 
                        height: action.payload.height,
                    });
        case ActionTypes.UPDATE_MAP_ORIGIN:
            return({...state,  start: action.payload.origin,
                                end: [action.payload.origin[0]+state.width, action.payload.origin[1]+state.height]});
        default: 
            return state;
    }
}