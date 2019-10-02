import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
                        savingState: false,
                        prevStates: [],
                    }

export const StateManager = ( state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_STATE_INITIATED:
            return({
                    ...state,
                    savingState: true,
            });
        case ActionTypes.SAVE_STATE:
            const cpyPrevStates = [...state.prevStates];
            cpyPrevStates.push(action.payload.state);
            return({
                ...state,
                prevStates: cpyPrevStates,
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
                prevStates: action.payload.prevStates,
                savingState: false,
            };
            statecpy[action.payload.mapname] = {
                gameobjects: action.payload.gameobjects,
            }
            return(statecpy);
        case ActionTypes.RESTORE_STATE_FROM_DISK:
            return({
                ...action.payload.state.statemanager,
                savingState: false,
            });
        default: 
            return state;
    }
}