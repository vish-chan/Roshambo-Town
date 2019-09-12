import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
                        prevState: null,
                    }

export const StateManager = ( state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_STATE:
            return({
                prevState: {
                    ...action.payload.state,
                }
            });
        case ActionTypes.RESTORE_STATE:
            return({
                prevState: null,
                
            });
        default: 
            return state;
    }
}