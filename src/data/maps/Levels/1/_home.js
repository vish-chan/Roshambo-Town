import { DOWN, NON_GANG_MEMBER } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { home } from '../../Maps/home';


export const _home = {
    /* Compulsory */

    name: "home",

    map: home,

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
                stationary: false,
                pathArr: [[4,1], [5,1]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1000,
                talkFlag: false,
            },

            { 
                //informational
                id: 1,
                name: "Joey",
                skin: SKINS["baby"],
                direction: DOWN,
                stationary: false,
                pathArr: [[4,7],[4,8],[5,8],[6,8],[6,7],[5,7],[4,7]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1000,
                battle: true,
                level: 1,
                battlerType: NON_GANG_MEMBER,
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