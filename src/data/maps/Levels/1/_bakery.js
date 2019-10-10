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
            position: [9, 7],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};