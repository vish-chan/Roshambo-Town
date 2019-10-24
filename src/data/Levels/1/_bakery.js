import { LEFT, RIGHT, NON_GANG_MEMBER, GANG_MEMBER, BATTLE_GM_MUSIC, UP, MAP_NAMES } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { bakery } from '../../Maps/bakery';


export const _bakery = {
    /* Compulsory */

    name: MAP_NAMES.bakery,

    map: bakery,

    /* Compulsory */
    player: {
        position: [8, 7],
        direction: 'UP',
    },

    /* Compulsory */
    npc : [
            { 
                //prop
                id: 0,
                name: "Vincent",
                skin: SKINS["friend_3"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[3,0]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },
            { 
                //prop
                id: 1,
                name: "Chase",
                skin: SKINS["friend_2"],
                direction: LEFT,
                stationary: false,
                pathArr: [[3,1]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },
            { 
                //battler
                id: 2,
                name: "Samantha",
                skin: SKINS["crush_1"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[6,3], [6,4]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 4000,
                battle: true,
                level: 2,
                battlerType: NON_GANG_MEMBER,
            },
            { 
                //tribe
                id: 3,
                name: "Eden",
                skin: SKINS["tribe_1"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[4,7], [4,8]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                battle: true,
                level: 3,
                battlerType: GANG_MEMBER,
                battleMusic: BATTLE_GM_MUSIC,
            },

            {  //battler
                id: 4,
                name: "John",
                skin: SKINS["kid_1"],
                direction: UP,
                stationary: false,
                pathArr: [[2,13]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                battle: true,
                level: 1,
                battlerType: NON_GANG_MEMBER,
            },

            { 
                //prop
                id: 5,
                name: "Cena",
                skin: SKINS["friend_4"],
                direction: UP,
                stationary: false,
                pathArr: [[2,11], [2,10]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 6000,
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