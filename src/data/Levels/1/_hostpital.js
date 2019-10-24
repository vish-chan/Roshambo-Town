import { NON_GANG_MEMBER, LEFT, MAP_NAMES, GANG_MEMBER, BATTLE_GM_MUSIC, RIGHT } from "../../../helpers/constants";
import { SKINS } from '../../skins';
import { PORTALS } from "../../gameobjects";
import { hospital } from '../../Maps/hospital';


export const _hospital = {
    /* Compulsory */

    name: MAP_NAMES.hospital,

    map: hospital,

    /* Compulsory */
    player: {
        position: [6, 5],
        direction: 'UP',
    },

    /* Compulsory */
    npc : [
        {
            //tribe
            id: 0,
            name: "Gambit",
            skin: SKINS["tribe_2"],
            direction: RIGHT,
            stationary: false,
            pathArr: [[3, 8]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 1500,
            battle: true,
            level: 4,
            battlerType: GANG_MEMBER,
            battleMusic: BATTLE_GM_MUSIC,
        },

        {   //prop
            id: 1,
            name: "Rocky",
            skin: SKINS["friend_8"],
            direction: LEFT,
            stationary: false,
            pathArr: [[3,9]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 3000,
        },

        {
            //battler
            id: 2,
            name: "Patient",
            skin: SKINS["patient_1"],
            direction: RIGHT,
            stationary: false,
            pathArr: [[3,0], [3, 1], [3,2]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 1500,
            battle: true,
            level: 2,
            battlerType: NON_GANG_MEMBER,
        },

        {   //prop
            id: 3,
            name: "Luke",
            skin: SKINS["friend_2"],
            direction: RIGHT,
            stationary: false,
            pathArr: [[6,0]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 3000,
        },

        {   //prop
            id: 4,
            name: "Skywalker",
            skin: SKINS["friend_3"],
            direction: LEFT,
            stationary: false,
            pathArr: [[6,1]],
            frameInterval: 100,
            moveInterval: 500,
            waitInterval: 3000,
        },

        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [7, 5],
            type: PORTALS[1],
            rotate:90,
        }
    ]
};