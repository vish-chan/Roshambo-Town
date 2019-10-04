import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
                        savingState: false,
                        prevStates: [],
                    }

export const StateManager = ( state = {...INITIAL_STATE}, action) => {
    switch(action.type) {
        case ActionTypes.START_NEW_JOURNEY:
            return({
                ...INITIAL_STATE,
            })
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
            statecpy[action.payload.mapinfo.map] = {
                gameobjects: action.payload.mapinfo.gameobjects,
                npc: action.payload.mapinfo.npc,
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