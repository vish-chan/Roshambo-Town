import { DOWN, GANG_MEMBER, BATTLE_GM_MUSIC, LEFT, UP } from "../../../../helpers/constants";
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
        {   //battler
            id: 0,
            name: "Razor",
            skin: SKINS["tribe_3"],
            direction: UP,
            stationary: false,
            pathArr: [[1,2], [0,2]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
            battle: true,
            level: 2,
            battlerType: GANG_MEMBER,
            battleMusic: BATTLE_GM_MUSIC,
        },
        { 
            //prop
            id: 1,
            name: "Pik",
            skin: SKINS["friend_1"],
            direction: DOWN,
            stationary: false,
            pathArr: [[1,0], [2,0]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
        },
        { 
            //prop
            id: 2,
            name: "Abu",
            skin: SKINS["friend_4"],
            direction: UP,
            stationary: false,
            pathArr: [[3,0], [2,0]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
        },
        { 
            //informational
            id: 3,
            name: "LT",
            skin: SKINS["kid_2"],
            direction: UP,
            stationary: false,
            pathArr: [[3,4], [2,4]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
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