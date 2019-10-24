import { LEFT, RIGHT, NON_GANG_MEMBER, MAP_NAMES } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { townSouth } from '../../Maps/town_south';
import { _library } from "./_library";
import { _hotel } from "./_hotel";


export const _townSouth = {
    /* Compulsory */

    name: MAP_NAMES.town_south,

    map: townSouth,

    /* Compulsory */
    player: {
        position: [14, 1],
        direction: 'RIGHT',
    },

    /* Compulsory */
    npc : [
            { 
                //informational
                id: 0,
                name: "Molly",
                skin: SKINS["crush_2"],
                direction: LEFT,
                stationary: false,
                pathArr: [[6,3], [6,4]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.library,
            },

            { 
                //prop
                id: 1,
                name: "Chambers",
                skin: SKINS["friend_2"],
                direction: LEFT,
                stationary: false,
                pathArr: [[4,11]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },

            
            { 
                //prop
                id: 2,
                name: "Ozil",
                skin: SKINS["friend_3"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[4,10]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
            },

            { 
                //battler
                id: 3,
                name: "Grindel",
                skin: SKINS["friend_8"],
                direction: RIGHT,
                stationary: false,
                pathArr: [[1,8], [2,8], [2,9], [1,9]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                battle: true,
                level: 3,
                battlerType: NON_GANG_MEMBER,
                //battleMusic: BATTLE_GM_MUSIC,
            },

            { 
                //informational
                id: 4,
                name: "Ilaria",
                skin: SKINS["crush_3"],
                direction: LEFT,
                stationary: false,
                pathArr: [[22,3], [22,4]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 2000,
                talkFlag: false,
                enablesPortal: MAP_NAMES.hotel,
            },
        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [4, 5],
            type: PORTALS[0],
            rotate:270,
            target: _library,
        },
        {
            position: [19, 7],
            type: PORTALS[0],
            rotate:270,
            target: _hotel,
        },
        {
            position: [14, 0],
            type: PORTALS[1],
            rotate:180,
        },
    ]
};