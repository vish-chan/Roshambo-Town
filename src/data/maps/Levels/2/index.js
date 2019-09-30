import { DOWN, LEFT, UP } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { GAMEOBJECTS, PORTALS } from "../../../gameobjects";
import { _hospital } from "./_hospital";
import { home } from "../../Maps/home";


export const level = {
    /* Compulsory */

    name: "home",

    map: home,

    /* Compulsory */
    player: {
        name: "Player",
        skin: SKINS["player"],
        position: [15, 17],
        frameInterval: 5,
        talk: [
            null,
            ["Hey! Whatsup?", "Do you have any plans for Fifa today?", "Great, see you!"],
            null,
        ],
    },

    /* Compulsory */
    npc : [{ 
                name: "Beast",
                skin: SKINS["friend_1"],
                direction: DOWN,
                stationary: false,
                pathArr: [[12,26], [13,26], [14,26], [15,26], [15, 25]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
                battle: true,
                level: 2,
            },
            { 
                name: "Moon",
                skin: SKINS["crush_1"],
                direction: LEFT,
                stationary: false,
                pathArr: [[15,12], [15,13], [15,14], [15,15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talk: ["I'm great dude. Long time no see ah!", "Let's catchup later today.", "BBye!"],
                battle: false,
            },
            { 
                name: "Ash",
                skin: SKINS["kid_3"],
                direction: UP,
                stationary: false,
                pathArr: [[1,12], [1,13], [1,14], [1,15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                battle: true,
                level: 2,
            }
        ],

    /* Compulsory */
    gameobjects : [
                    { 
                        type: GAMEOBJECTS[6],
                        position: [15, 16],
                    },
                    { 
                        type: GAMEOBJECTS[7],
                        position: [15, 18],
                    },
    ],

    /* Compulsory */
    portals: [
        {
            position: [14, 17],
            type: PORTALS[1],
            rotate:270,
            target: _hospital,
        }
    ]
};