import * as ActionTypes from './ActionTypes';


const INITIAL_STATE = { 
                        name: null,
                        tiles: [],
                        width: 0,
                        height: 0,
                        isLoading: true,
                        src: null,
                        audioSrc: null,
                    }

export const Map = (state = {...INITIAL_STATE}, action) => {
    switch(action.type) {
        case ActionTypes.START_NEW_JOURNEY:
            return({
                ...INITIAL_STATE,
            });

        case ActionTypes.ADD_MAP:
            return({...state, 
                    name: action.payload.name,
                    tiles: action.payload.tiles, 
                    width: action.payload.width,
                    height: action.payload.height,
                    src: action.payload.src,
                    audioSrc: action.payload.audioSrc,
                    isLoading: false,
                    });
        case ActionTypes.MAP_LOADING:
            return({
                ...state,
                isLoading: true,
            });
        case ActionTypes.RESTORE_STATE:
            return({
                ...action.payload.state.map,
                isLoading: false,
            });
        case ActionTypes.RESTORE_STATE_FROM_DISK:
            return({
                ...action.payload.state.map,
                isLoading: false,
            });
        default: 
            return state;
    }
}