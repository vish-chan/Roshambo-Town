import * as ActionTypes from './ActionTypes';


const INITIAL_STATE = { 
                        isOpen: false,
                    };

export const Battle = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.TOGGLE_BATTLE:
            return({
                ...state,
                isOpen: !state.isOpen,
            })
        default: 
            return state;
    }
}