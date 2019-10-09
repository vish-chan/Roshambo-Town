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