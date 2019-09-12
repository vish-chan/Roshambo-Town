import { DOWN, LEFT, UP } from "../../helpers/constants";
import { Skin } from '../skins';
import { GameObjects } from "../gameobjects";

export const hospital = {
    tiles: [
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,],
    ],

    src: 'assets/images/maps/hospital.png',

    backgroundColor: "#ffffff",

    npc : [{ 
                id: 0,
                name: "Beast",
                skin: Skin[5],
                position: [1, 6],
                direction: DOWN,
                stationary: false,
                pathArr: [[1,6], [1,5], [1,4], [1,3], [1, 2]],
                pathIdx: 0,
                pathDir: 1,
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 1500,
            },
            { 
                id: 1,
                name: "Moon",
                skin: Skin[6],
                position: [7, 12],
                direction: LEFT,
                stationary: false,
                pathArr: [[7,12], [7,13], [7,14], [7,15]],
                pathIdx: 0,
                pathDir: 1,
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
                talk: ["I'm great dude. Long time no see ah!", "Let's catchup later today.", "BBye!"],
            },
        ],
    
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

    gameobjects : [
                    { 
                        id: 0,
                        type: GameObjects[0],
                        position: [3, 10],
                    },
                    { 
                        id: 1,
                        type: GameObjects[3],
                        position: [5, 15],
                    },
    ],
};