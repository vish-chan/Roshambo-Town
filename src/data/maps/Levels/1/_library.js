import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { library } from '../../Maps/library';


export const _library = {
    /* Compulsory */

    name: "library",

    map: library,

    /* Compulsory */
    player: {
        position: [16, 8],
        direction: 'UP',
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
                pathArr: [[4,1]],
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
            position: [17, 8],
            type: PORTALS[1],
            rotate:270,
        }
    ]
};