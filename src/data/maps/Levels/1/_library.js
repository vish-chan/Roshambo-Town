import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { library } from '../../Maps/library';
import { _gameroom } from "./_gameroom";


export const _library = {
    /* Compulsory */

    name: "library",

    map: library,

    /* Compulsory */
    player: {
        position: [16, 8],
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
            position: [4, 15],
            type: PORTALS[0],
            rotate: 0,
            target: _gameroom,
        },
        {
            position: [17, 8],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};