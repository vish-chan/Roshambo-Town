import * as ActionTypes from './ActionTypes';

const DEFAULT_STATE = {
    isOpen: false, 
    position: "top",
    person1: {},
    person2: {},
    dialogIdx: 0,
    speakerIdx: 0,
    npcId: null,
    battleConversation: false,
 };

export const Dialog = (state = {
                          ...DEFAULT_STATE,
                        }, action) => {
            switch(action.type) {
                case ActionTypes.SET_DIALOG_STATUS:
                    return({
                        ...state,
                        isOpen: true,
                        position: action.payload.position,
                        person1: action.payload.person1,
                        person2: action.payload.person2,
                        npcId: action.payload.npcId,
                        dialogIdx: 0,
                        speakerIdx: 0,
                        battleConversation: action.payload.battleConversation, 
                    });
                case ActionTypes.RESET_DIALOG_STATUS:
                        return({
                            ...DEFAULT_STATE,
                        });
                case ActionTypes.NEXT_DIALOG:
                    if(state.speakerIdx===0) {
                        return({
                            ...state,
                            speakerIdx: 1,
                        })
                    } else {
                        return({
                            ...state,
                            speakerIdx: 0,
                            dialogIdx: (state.dialogIdx + 1) % state.person1.dialogs.length,
                        })
                    }
                default: 
                    return state;
            }
}