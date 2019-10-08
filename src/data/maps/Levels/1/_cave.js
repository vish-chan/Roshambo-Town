import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { cave } from '../../Maps/cave';
import { _hell } from "./_hell";


export const _cave = {
    /* Compulsory */

    name: "cave",

    map: cave,

    /* Compulsory */
    player: {
        position: [3, 2],
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
                pathArr: [[3,0]],
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
            position: [1, 2],
            type: PORTALS[0],
            rotate:270,
            target: _hell,
        },
        {
            position: [4, 2],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};