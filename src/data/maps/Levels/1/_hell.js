import { BOSS_BATTLE_LEVEL, BOSS, BATTLE_BOSS_MUSIC, RIGHT, LEFT } from "../../../../helpers/constants";
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
                //tribe
                id: 0,
                name: "Beast",
                skin: SKINS["boss"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[2,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                battle: true,
                level: BOSS_BATTLE_LEVEL,
                battlerType: BOSS,
                battleMusic: BATTLE_BOSS_MUSIC,
            },
            { 
                //props
                id: 1,
                name: "Rock",
                skin: SKINS["blackcat"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[5,3], [5,2], [4,2], [3,2], [3,3], [3,4], [3,5], [3,6]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },

            { 
                //props
                id: 2,
                name: "Paper",
                skin: SKINS["whitecat"],
                direction: LEFT,
                stationary: false,
                pathArr: [[2,4], [2,5]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1000,
            },

            { 
                //props
                id: 3,
                name: "Scissors",
                skin: SKINS["orangecat"],
                direction: LEFT,
                stationary: false,
                pathArr: [[4,2], [4,3],[4,4],[4,5],[4,6]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1000,
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