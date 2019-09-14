import { hospital } from '../../Maps/hospital';
import { DOWN, LEFT } from "../../../../helpers/constants";
import { Skin } from '../../../skins';
import { GAMEOBJECTS } from "../../../gameobjects";

export const _hospital = {

    name: "_hospital",

    map: hospital,

    player: {
        name: "Player",
        skin: Skin[0],
        position: [5, 8],
        frameInterval: 5,
        talk: [
            null,
            ["Hey! Whatsup?", "Do you have any plans for Fifa today?", "Great, see you!"],
        ],
    },

    npc : [{ 
                name: "Beast",
                skin: Skin[5],
                direction: DOWN,
                stationary: false,
                pathArr: [[1,6], [1,5], [1,4], [1,3], [1, 2]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
            },
            { 
                id: 1,
                name: "Moon",
                skin: Skin[6],
                direction: LEFT,
                stationary: false,
                pathArr: [[7,12], [7,13], [7,14], [7,15]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talk: ["I'm great dude. Long time no see ah!", "Let's catchup later today.", "BBye!"],
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
};