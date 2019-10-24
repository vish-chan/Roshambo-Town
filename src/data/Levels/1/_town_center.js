import { DOWN, NON_GANG_MEMBER, LEFT, RIGHT, MAP_NAMES } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { townCenter } from '../../Maps/town_center';
import { _home } from "./_home";
import { _bakery } from "./_bakery";
import { _townNorth } from "./_town_north";
import { _townSouth } from "./_town_south";
import { _hospital } from "./_hostpital";

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
                name: "Tracer",
                skin: SKINS["friend_7"],
                direction: DOWN,
                stationary: false,
                pathArr: [[11,2], [12,2], [13,2], [14,2], [14,3]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                talkFlag: false,
                enablesPortal: MAP_NAMES.town_north,
            },

            {
                //informational
                id:4,
                name: "Betty",
                skin: SKINS["nurse"],
                direction: LEFT,
                stationary: false,
                pathArr: [[21,12], [21,13], [21,14]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.hospital,
            },

            {
                //informational
                id:8,
                name: "Koby",
                skin: SKINS["friend_9"],
                direction: DOWN,
                stationary: false,
                pathArr: [[15,21], [16,21], [17,21]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.town_south,
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
            position: [14, 24],
            type: PORTALS[0],
            rotate:0,
            target: _townSouth,
        },
        {
            position: [21, 17],
            type: PORTALS[0],
            rotate:270,
            target: _hospital,
        }

    ]
};