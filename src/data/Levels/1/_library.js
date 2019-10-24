import { DOWN, UP, LEFT, RIGHT, NON_GANG_MEMBER, MAP_NAMES } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { library } from '../../Maps/library';
import { _gameroom } from "./_gameroom";


export const _library = {
    /* Compulsory */

    name: MAP_NAMES.library,

    map: library,

    /* Compulsory */
    player: {
        position: [16, 8],
        direction: 'UP',
    },

    /* Compulsory */
    npc : [
        { 
            //prop
            id: 0,
            name: "Jordan",
            skin: SKINS["kid_2"],
            direction: UP,
            stationary: false,
            pathArr: [[14,0], [14,1], [14,2]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 3000,
            battle: true,
            level: 3,
            battlerType: NON_GANG_MEMBER,
        },

        { 
            //prop
            id: 1,
            name: "Prick",
            skin: SKINS["friend_5"],
            direction: RIGHT,
            stationary: false,
            pathArr: [[14,16]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
        },

        { 
            //prop
            id: 2,
            name: "Pom",
            skin: SKINS["friend_3"],
            direction: LEFT,
            stationary: false,
            pathArr: [[14,17]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
        },

        { 
            //prop
            id: 3,
            name: "Bam",
            skin: SKINS["friend_6"],
            direction: UP,
            stationary: false,
            pathArr: [[10,13], [10,14], [9,14]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
        },

        { 
            //prop
            id: 4,
            name: "Boo",
            skin: SKINS["friend_2"],
            direction: UP,
            stationary: false,
            pathArr: [[7,16]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
        },

        {   //battler
            id: 5,
            name: "Tori",
            skin: SKINS["kid_3"],
            direction: DOWN,
            stationary: false,
            pathArr: [[8,0]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 6000,
            battle: true,
            level: 2,
            battlerType: NON_GANG_MEMBER,
        },

        {
            //informational
            id:6,
            name: "Ghissu",
            skin: SKINS["kid_1"],
            direction: RIGHT,
            stationary: false,
            pathArr: [[4,3], [4,4], [4,5]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 1500,
            talkFlag: false,
            enablesPortal: MAP_NAMES.gameroom,
        },

        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [4, 15],
            type: PORTALS[0],
            rotate: 0,
            target: _gameroom,
        },
        {
            position: [17, 8],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};