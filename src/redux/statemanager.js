import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
                        prevState: null,
                    }

export const StateManager = ( state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_STATE:
            return({
                ...state,
                prevState: {
                    ...action.payload.state,
                }
            });
        case ActionTypes.RESTORE_STATE:
            let statecpy = {
                ...state,
                prevState: null,
            };
            statecpy[action.payload.mapname] = {
                gameobjects: action.payload.gameobjects,
            }
            return(statecpy);
        default: 
            return state;
    }
}