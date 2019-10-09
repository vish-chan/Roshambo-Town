import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { townNorth } from '../../Maps/town_north';
import { _cave } from "./_cave";



export const _townNorth = {
    /* Compulsory */

    name: "townNorth",

    map: townNorth,

    /* Compulsory */
    player: {
        position: [19, 14],
        direction: 'LEFT',
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
                pathArr: [[11,6]],
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
            position: [6, 6],
            type: PORTALS[0],
            rotate:270,
            target: _cave,
        },
        {
            position: [19, 15],
            type: PORTALS[1],
            rotate:0,
        },
    ]
};