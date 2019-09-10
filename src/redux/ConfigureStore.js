import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Player } from './player';
import { Map } from './map';
import { ViewPort } from './viewport';
import { NPC } from './npc';
import { GameObject } from './gameobject'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dialog } from './dialog';

const rootReducer = combineReducers({
    player : Player,
    map: Map,
    viewport: ViewPort,
    npc: NPC,
    gameobjects: GameObject,
    dialog: Dialog,
});



export const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    

