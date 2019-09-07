import { DOWN, TILE_SIZE, RIGHT } from "../../../helpers/constants";
import { Skin } from '../../skins';

const TS = TILE_SIZE;

const BRIDGE = [0,0, TS, TS];
const LEFTUPCORNER_1 = [1*TS,0, TS, TS];
const UPRIGHTCORNER_1 = [2*TS,0, TS, TS];
const RIGHTDOWNCORNER_1 = [3*TS,0, TS, TS];
const DOWNLEFTCORNER_1 = [4*TS,0, TS, TS];
const RIGHTDOWNCORNER_2 = [0,1*TS, TS, TS];
const DOWNLEFTCORNER_2 = [1*TS,1*TS, TS, TS];
const LEFTUPCORNER_2 = [2*TS,1*TS, TS, TS];
const UPRIGHTCORNER_2 = [3*TS,1*TS, TS, TS];
const GRASS = [4*TS,1*TS, TS, TS];
const PATH_PLAIN = [0,2*TS, TS, TS];
const PATH_PATTERNED = [1*TS,2*TS, TS, TS];
const BOTTOMPATH = [2*TS,2*TS, TS, TS];
const LEFTPATH = [3*TS,2*TS, TS, TS];
const RIGHTPATH = [4*TS,2*TS, TS, TS];
const UPPATH = [0, 3*TS, TS, TS];
const GRASS_PATTERNED = [1*TS, 3*TS, TS, TS];
const RIVER = [2*TS, 3*TS, TS, TS];
const BLUETREE = [5*TS, 0, 2*TS, 3*TS];
const REDTREE = [7*TS, 0, 2*TS, 2*TS];
const GREENTREE = [7*TS, 2*TS, 2*TS, 2*TS];
const HOUSE = [9*TS, 0, 3*TS, 3*TS];


export const map = {
    tiles: [
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   8,  -8,  -8,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  17,   1,  18,   0,   0,  -8,  -8,  -8,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   6,  -6,   0,  17,   1,  18,   0,   0,  -8,  -8,  -8,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  -6,  -6,   0,  17,   2,  18,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  -6,  -6,   0,  17,   1,  18,   0,   0,   0,   0,   0,   0,   8,  -8,  -8,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  22, -22,  17,   1,  18,   0,   0,   0,   0,   0,   0,  -8,  -8,  -8,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   6,  -6, -22, -22,  17,   1,  18,   0,   0,   0,   0,   0,   0,  -8, - 8,  -8,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  -6,  -6,   7,  -7,  17,   2,  18,   0,   0,   0,   0,   0,   0,  17,   2,  18,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  -6,  -6,  -7,  -7,  17,   1,  18,   0,   0,   0,   0,   0,   0,  17,   1,  18,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  19,  19,  19,  19,  19,  19,  16,   1,  10,  19,  19,  19,  19,  19,  19,  16,   2,  18,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   1,   1,   2,   1,   1,   1,   1,   2,   1,   1,   2,   1,   1,   1,   1,   1,  18,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  20,  15,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],

    ],

    backgroundColor: "#6df7b1",

    sprites: {
        src: "assets/images/80/sprites_80_full.png",
        /*Blue Tree*/
        indices: [ GRASS_PATTERNED, /* 0 */
                   PATH_PLAIN,  /* 1 */
                   PATH_PATTERNED, /* 2 */
                   GRASS, /*3*/
                   BRIDGE,  /* 4 */
                   null,   /* 5 */
                   BLUETREE, /* 6 */
                   REDTREE, /* 7 */
                   HOUSE, /* 8 */
                   LEFTUPCORNER_1,  /* 9 */
                   LEFTUPCORNER_2,  /* 10 */
                   UPRIGHTCORNER_1, /* 11 */
                   UPRIGHTCORNER_2, /* 12 */
                   RIGHTDOWNCORNER_1, /* 13 */
                   RIGHTDOWNCORNER_2, /* 14 */
                   DOWNLEFTCORNER_1, /* 15 */
                   DOWNLEFTCORNER_2, /* 16 */
                   LEFTPATH, /* 17 */
                   RIGHTPATH, /* 18 */
                   UPPATH,/* 19 */
                   BOTTOMPATH, /* 20 */
                   RIVER, /*21*/
                   GREENTREE /* 22 */
                ]
    },

    npc : [{ 
                id: 0,
                name: "Beast",
                skin: Skin[5],
                position: [12, 26],
                direction: DOWN,
                stationary: false,
                pathArr: [[12,26], [13,26], [14,26], [15,26], [15, 25]],
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
                position: [15, 12],
                direction: RIGHT,
                stationary: false,
                pathArr: [[15,12], [15,13], [15,14], [15,15]],
                pathIdx: 0,
                pathDir: 1,
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },
        ],
    
    player: {
        name: "Player 1",
        skin: Skin[0],
        position: [15, 17],
        frameInterval: 5,
    }
};