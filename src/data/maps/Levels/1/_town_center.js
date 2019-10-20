import { DOWN, GANG_MEMBER, NON_GANG_MEMBER, BATTLE_MUSIC, BATTLE_BOSS_MUSIC, BATTLE_NUM_GANG_MEMBERS, BATTLE_GM_MUSIC, LEFT, RIGHT } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { townCenter } from '../../Maps/town_center';
import { _home } from "./_home";
import { _bakery } from "./_bakery";
import { _townNorth } from "./_town_north";
import { _townSouth } from "./_town_south";

export const _townCenter = {
    /* Compulsory */

    name: "townCenter",

    map: townCenter,

    /* Compulsory */
    player: {
        position: [14, 14],
        direction: 'DOWN',
    },

    /* Compulsory */
    npc : [
            { 
                //informational
                id: 0,
                name: "Frank",
                skin: SKINS["friend_5"],
                direction: LEFT,
                stationary: true,
                pathArr: [[14,16], [14,17], [14,18]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                talkFlag: false,
            },

            { 
                //informational
                id: 1,
                name: "Tia",
                skin: SKINS["crush_4"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[7,7], [7,8]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                talkFlag: false,
            },

            {
                //battler
                id:2,
                name: "Nathan",
                skin: SKINS["friend_2"],
                direction: DOWN,
                stationary: false,
                pathArr: [[3,6], [4,6]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                battle: true,
                level: 1,
                battlerType: NON_GANG_MEMBER,
                //battleMusic: BATTLE_GM_MUSIC,
            },

            {
                //informational
                id:3,
                name: "Tracer",
                skin: SKINS["friend_7"],
                direction: DOWN,
                stationary: false,
                pathArr: [[11,2], [12,2], [13,2], [14,2], [14,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                talkFlag: false,
            },

            {
                //informational
                id:4,
                name: "Sean",
                skin: SKINS["chef"],
                direction: LEFT,
                stationary: false,
                pathArr: [[20,11], [20,12], [20,13]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
            },

            {
                //tribe
                id:5,
                name: "Pathay",
                skin: SKINS["tribe_2"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[19, 15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                battle: true,
                level: 4,
                battlerType: GANG_MEMBER,
                battleMusic: BATTLE_GM_MUSIC,
            },

            {   //prop
                id: 6,
                name: "Rocky",
                skin: SKINS["friend_8"],
                direction: LEFT,
                stationary: false,
                pathArr: [[19,16]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },

            {
                //battler
                id:7,
                name: "Chop",
                skin: SKINS["bully_1"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[19,20], [19, 21], [20,21]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                battle: true,
                level: 2,
                battlerType: NON_GANG_MEMBER,
            },
        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [12, 15],
            type: PORTALS[0],
            rotate:270,
            target: _home,
        },
        {
            position: [7, 10],
            type: PORTALS[0],
            rotate:270,
            target: _bakery,
        },
        {
            position: [19, 0],
            type: PORTALS[0],
            rotate:180,
            target: _townNorth,
        },
        {
            position: [14, 21],
            type: PORTALS[0],
            rotate:0,
            target: _townSouth,
        }

    ]
};