import { DOWN, RIGHT, GANG_MEMBER, BATTLE_GM_MUSIC, LEFT, NON_GANG_MEMBER, MAP_NAMES } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { townNorth } from '../../Maps/town_north';
import { _cave } from "./_cave";



export const _townNorth = {
    /* Compulsory */

    name: MAP_NAMES.town_north,

    map: townNorth,

    /* Compulsory */
    player: {
        position: [19, 14],
        direction: 'LEFT',
    },

    /* Compulsory */
    npc : [
            {   //prop
                id: 0,
                name: "Kaloo",
                skin: SKINS["blackcat"],
                direction: DOWN,
                stationary: false,
                pathArr: [[8,5],[8,6],[8,7]],
                frameInterval: 50,
                moveInterval: 250,
                waitInterval: 2000,
            },

            {   //prop
                id: 1,
                name: "Goku",
                skin: SKINS["whitecat"],
                direction: DOWN,
                stationary: false,
                pathArr: [[10,7], [10,6], [10,5],[11,5],[12,5],[13,5], [14,5],[15,5]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },

            {   //prop
                id: 2,
                name: "bruno",
                skin: SKINS["brownpuppy"],
                direction: DOWN,
                stationary: false,
                pathArr: [[10,6], [10,5],[11,5],[12,5],[13,5], [14,5],[15,5],[16,5]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },

            {
                //informational
                id:3,
                name: "Maty",
                skin: SKINS["crush_1"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[13,11], [13,12]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
            },

            {
                //tribe
                id:4,
                name: "Tegan",
                skin: SKINS["tribe_4"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[19, 6], [19,7], [19,8]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                battle: true,
                level: 5,
                battlerType: GANG_MEMBER,
                battleMusic: BATTLE_GM_MUSIC,
            },

            {   //prop
                id: 5,
                name: "Matt",
                skin: SKINS["friend_2"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[11,6]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },
            
            {   //battler
                id: 6,
                name: "Damon",
                skin: SKINS["friend_3"],
                direction: LEFT,
                stationary: false,
                pathArr: [[11,7]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                battle: true,
                level: 4,
                battlerType: NON_GANG_MEMBER,
            },

            {
                //informational
                id:7,
                name: "Void",
                skin: SKINS["kid_2"],
                direction: DOWN,
                stationary: false,
                pathArr: [[6,6], [6,5], [7,5]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.cave,
            },

            {   //battler
                id: 8,
                name: "Hunt",
                skin: SKINS["bully_1"],
                direction: DOWN,
                stationary: false,
                pathArr: [[7,14], [7,13]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
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