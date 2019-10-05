import { hospital } from '../../Maps/hospital';
import { DOWN, LEFT, UP } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { GAMEOBJECTS, PORTALS } from "../../../gameobjects";

export const _hospital = {

    name: "hospital",

    map: hospital,

    player: {  
        position: [7, 8],
        direction: UP,
        talk: [
            null,
            ["Hey! Whatsup?", "Do you have any plans for Fifa today?", "Great, see you!"],
        ],
    },

    npc : [{ 
                id: 0,
                name: "PSYCH",
                skin: SKINS["kid_1"],
                direction: DOWN,
                stationary: true,
                pathArr: [[1,6], [1,5], [1,4], [1,3], [1, 2]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
            },
            { 
                id:1,
                name: "BELLA",
                skin: SKINS["crush_1"],
                direction: LEFT,
                stationary: true,
                pathArr: [[7,12], [7,13], [7,14], [7,15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talk: ["I'm great dude. Long time no see ah!", "Let's catchup later today.", "BBye!"],
                battle: true,
                level: 1,
            },
        ],

    gameobjects : [
                    { 
                        type: GAMEOBJECTS[0],
                        position: [3, 10],
                    },
                    { 
                        type: GAMEOBJECTS[3],
                        position: [5, 15],
                    },
    ],

    portals: [
        {
            position: [8, 8],
            type: PORTALS[1],
            rotate: 90,
        }
    ],
};