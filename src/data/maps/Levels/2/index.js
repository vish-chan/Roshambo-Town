import { DOWN, LEFT, UP } from "../../../../helpers/constants";
import { Skin } from '../../../skins';
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
        skin: Skin[0],
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
                skin: Skin[5],
                direction: DOWN,
                stationary: false,
                pathArr: [[12,26], [13,26], [14,26], [15,26], [15, 25]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
            },
            { 
                name: "Moon",
                skin: Skin[6],
                direction: LEFT,
                stationary: false,
                pathArr: [[15,12], [15,13], [15,14], [15,15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talk: ["I'm great dude. Long time no see ah!", "Let's catchup later today.", "BBye!"],
            },
            { 
                name: "Ash",
                skin: Skin[4],
                direction: UP,
                stationary: true,
                pathArr: [[1,12], [0,13], [0,14], [0,15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
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
            position: [15, 18],
            type: PORTALS[0],
            target: _hospital,
        }
    ]
};