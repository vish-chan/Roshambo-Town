import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { hell } from '../../Maps/hell';


export const _hell = {
    /* Compulsory */

    name: "hell",

    map: hell,

    /* Compulsory */
    player: {
        position: [7, 4],
        direction: 'UP',
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
                pathArr: [[2,4]],
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
            position: [8, 4],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};