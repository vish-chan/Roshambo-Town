import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { townSouth } from '../../Maps/town_south';
import { _library } from "./_library";
import { _hotel } from "./_hotel";


export const _townSouth = {
    /* Compulsory */

    name: "townSouth",

    map: townSouth,

    /* Compulsory */
    player: {
        position: [14, 1],
        direction: 'RIGHT',
        talk: [
            ["Great to be back, Dad. The town looks very different to me!", "OMG! How can we get take it back from them?", "I need some practice beofre challenging them.", "Thanks Dad."],
        ],
    },

    /* Compulsory */
    npc : [
            { 
                //informational
                id: 0,
                name: "Dad",
                skin: SKINS["prof"],
                direction: DOWN,
                stationary: true,
                pathArr: [[6,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },
        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [4, 5],
            type: PORTALS[0],
            rotate:-90,
            target: _library,
        },
        {
            position: [19, 7],
            type: PORTALS[0],
            rotate:-90,
            target: _hotel,
        },
        {
            position: [14, 0],
            type: PORTALS[1],
            rotate:180,
        },
    ]
};