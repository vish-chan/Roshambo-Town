import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
                        start: [0, 0],
                        end: [],
                        width:0,
                        height:0,
                    }

export const ViewPort = ( state = {...INITIAL_STATE}, action) => {
    switch(action.type) {
        case ActionTypes.START_NEW_JOURNEY:
            return({
                ...INITIAL_STATE,
            });
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

        case ActionTypes.RESTORE_STATE:
            return({
                ...action.payload.state.viewport,
            });

        case ActionTypes.RESTORE_STATE_FROM_DISK:
            return({
                ...action.payload.state.viewport,
            });
        default: 
            return state;
    }
}