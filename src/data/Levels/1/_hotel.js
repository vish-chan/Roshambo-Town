import { DOWN, RIGHT, LEFT, GANG_MEMBER, BATTLE_GM_MUSIC, NON_GANG_MEMBER, MAP_NAMES } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { hotel } from '../../Maps/hotel';


export const _hotel = {
    /* Compulsory */

    name: MAP_NAMES.hotel,

    map: hotel,

    /* Compulsory */
    player: {
        position: [11, 6],
        direction: 'UP',
    },

    /* Compulsory */
    npc : [
            {   //prop
                id: 0,
                name: "Cruz",
                skin: SKINS["friend_2"],
                direction: RIGHT,
                stationary: true,
                pathArr: [[12,2]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },

            {   //prop
                id: 1,
                name: "Lillie",
                skin: SKINS["crush_1"],
                direction: LEFT,
                stationary: true,
                pathArr: [[12,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },

            {   //prop
                id: 2,
                name: "Lil",
                skin: SKINS["kid_2"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[12,9], [12,10]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            }, 
            {   //prop
                id: 3,
                name: "Wayne",
                skin: SKINS["friend_7"],
                direction: DOWN,
                stationary: true,
                pathArr: [[8,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },

            {   //prop
                id: 4,
                name: "Spark",
                skin: SKINS["kid_3"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[8,8], [8,9]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },

            {   //prop
                id: 5,
                name: "Sparkle",
                skin: SKINS["whitepuppy"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[6,9], [6,10]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },

            {   //tribe
                id: 6,
                name: "Snyder",
                skin: SKINS["tribe_5"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[6,8]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                battle: true,
                level: 5,
                battlerType: GANG_MEMBER,
                battleMusic: BATTLE_GM_MUSIC,
                
            },

            {   //prop
                id: 7,
                name: "Weisley",
                skin: SKINS["bully_1"],
                direction: LEFT,
                stationary: true,
                pathArr: [[6,11]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },

            {   //informational
                id: 8,
                name: "Rose",
                skin: SKINS["crush_3"],
                direction: DOWN,
                stationary: true,
                pathArr: [[5,6]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
            },

            {   //battler
                id: 9,
                name: "Max",
                skin: SKINS["friend_6"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[7,2], [7,4]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                battle: true,
                level: 4,
                battlerType: NON_GANG_MEMBER,
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