import { DOWN, RIGHT } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
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
    },

    /* Compulsory */
    npc : [
            { 
                //props
                id: 0,
                name: "Misty",
                skin: SKINS["blackcat"],
                direction: DOWN,
                stationary: false,
                pathArr: [[1,0], [2,0], [3,0], [4,0],],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1000,
            },

            { 
                //props
                id: 1,
                name: "Trigger",
                skin: SKINS["orangecat"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[1,1], [1,2], [1,3], [1,4],],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                talkFlag: false,
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