import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
    isOpen: false, 
    HEALER : [],
    CURRENCY: [],
    EATABLE: [],
 };

export const Inventory = (state = {...INITIAL_STATE}, action) => {
            switch(action.type) {
                case ActionTypes.START_NEW_JOURNEY:
                    return({
                        ...INITIAL_STATE,
                    });
                    
                case ActionTypes.TOGGLE_INVENTORY_DISPLAY:
                    return({
                        ...state,
                        isOpen: !state.isOpen,
                    });

                case ActionTypes.ADD_OBJECT_TO_INVENTORY:
                    let statecpy = {...state};
                    statecpy[action.payload.object.type.type] = state[action.payload.object.type.type].concat(action.payload.object);
                    return(statecpy);

                case ActionTypes.RESTORE_STATE_FROM_DISK:
                    return({
                        ...action.payload.state.inventory,
                    });

                default: 
                    return state;
            }
}