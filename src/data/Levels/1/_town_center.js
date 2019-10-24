import { DOWN, GANG_MEMBER, NON_GANG_MEMBER, BATTLE_GM_MUSIC, LEFT, RIGHT, MAP_NAMES } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { townCenter } from '../../Maps/town_center';
import { _home } from "./_home";
import { _bakery } from "./_bakery";
import { _townNorth } from "./_town_north";
import { _townSouth } from "./_town_south";

export const _townCenter = {
    /* Compulsory */

    name: MAP_NAMES.town_center,

    map: townCenter,

    /* Compulsory */
    player: {
        position: [14, 15],
        direction: 'RIGHT',
    },

    /* Compulsory */
    npc : [
            { 
                //informational
                id: 0,
                name: "Frank",
                skin: SKINS["friend_5"],
                direction: LEFT,
                stationary: false,
                pathArr: [[14,16], [14,15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.home,
            },

            { 
                //informational
                id: 1,
                name: "Tia",
                skin: SKINS["crush_4"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[7,6], [7,7]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.bakery,
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
                name: "Koby",
                skin: SKINS["friend_7"],
                direction: DOWN,
                stationary: false,
                pathArr: [[11,2], [12,2], [13,2], [14,2], [14,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                talkFlag: false,
                enablesPortal: MAP_NAMES.town_south,
            },

            {
                //informational
                id:4,
                name: "Sean",
                skin: SKINS["chef"],
                direction: LEFT,
                stationary: false,
                pathArr: [[21,11], [21,12], [21,13]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
            },

            {
                //tribe
                id:5,
                name: "Gambit",
                skin: SKINS["tribe_2"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[20, 15]],
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
                pathArr: [[20,16]],
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
                pathArr: [[20,20], [20, 21], [21,21]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                battle: true,
                level: 2,
                battlerType: NON_GANG_MEMBER,
            },

            {
                //informational
                id:8,
                name: "Tracer",
                skin: SKINS["friend_9"],
                direction: LEFT,
                stationary: false,
                pathArr: [[16,18], [16,19]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.town_north,
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
            position: [6, 10],
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