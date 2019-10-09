import { DOWN } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { gameroom } from '../../Maps/gameroom';


export const _gameroom = {
    /* Compulsory */

    name: "gameroom",

    map: gameroom,

    /* Compulsory */
    player: {
        position: [3, 2],
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
                pathArr: [[3,0]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
            },
        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [4, 2],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};