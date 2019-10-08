import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { bakery } from '../../Maps/bakery';


export const _bakery = {
    /* Compulsory */

    name: "bakery",

    map: bakery,

    /* Compulsory */
    player: {
        position: [8, 7],
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
            position: [9, 7],
            type: PORTALS[1],
            rotate:270,
        }
    ]
};