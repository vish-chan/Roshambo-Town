import * as ActionTypes from './ActionTypes';

const DEFAULT_STATE = {
    isOpen: false, 
    HEALER : [],
    CURRENCY: [],
    EATABLE: [],
 };

export const Inventory = (state = {
                          ...DEFAULT_STATE,
                        }, action) => {
            switch(action.type) {

                case ActionTypes.TOGGLE_INVENTORY_DISPLAY:
                    return({
                        ...state,
                        isOpen: !state.isOpen,
                    });

                case ActionTypes.ADD_OBJECT_TO_INVENTORY:
                    let statecpy = {...state};
                    statecpy[action.payload.object.type.type] = state[action.payload.object.type.type].concat(action.payload.object);
                    return(statecpy);

                default: 
                    return state;
            }
}