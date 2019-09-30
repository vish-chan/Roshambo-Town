import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
                        savedGame: null,
                        savingState: false,
                        prevState: null,
                    }

export const StateManager = ( state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_STATE_INITIATED:
            return({
                    ...state,
                    savingState: true,
            });
        case ActionTypes.SAVE_STATE:
            return({
                ...state,
                prevState: {
                    ...action.payload.state,
                },
                savingState: false,
            });
        case ActionTypes.SAVE_STATE_END:
            return({
                    ...state,
                    savingState: false,
            });
        case ActionTypes.RESTORE_STATE:
            let statecpy = {
                ...state,
                prevState: null,
                savingState: false,
            };
            statecpy[action.payload.mapname] = {
                gameobjects: action.payload.gameobjects,
            }
            return(statecpy);
        case ActionTypes.RESTORE_STATE_FROM_DISK:
            return({
                ...action.payload.state.state.manager,
                savingState: false,
            });
        default: 
            return state;
    }
}