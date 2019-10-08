import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { hotel } from '../../Maps/hotel';


export const _hotel = {
    /* Compulsory */

    name: "hotel",

    map: hotel,

    /* Compulsory */
    player: {
        position: [11, 6],
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
                pathArr: [[7,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talk: ["Hey Son! Whatsup!", "The town is in a lot of trouble after the tribe takeover", "You need to defeat their boss in roshambo.", "Good luck!"],
                talkSummary: ["You should go out and defeat the tribe!"],
            },
        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [12, 6],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};