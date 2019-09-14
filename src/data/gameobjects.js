import { HEALER, EATABLE, CURRENCY, PORTAL } from "../helpers/constants";

export const GAMEOBJECTS = [
    {
        /*0*/
        id: 0,
        name: "redpotion",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [0,0],
        width: 40,
        height: 40,
        type: HEALER,
    },

    {
        /*1*/
        id: 1,
        name: "vaccine",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [200,0],
        width: 40,
        height: 40,
        type: HEALER,
    },

    {
        /*2*/
        id: 2,
        name: "water",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [240,0],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*3*/
        id: 3,
        name: "berry",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [240,280],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*4*/
        id: 4,
        name: "diamond",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [240,200],
        width: 40,
        height: 40,
        type: CURRENCY,
    },

    {
        /*5*/
        id: 5,
        name: "meat",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [280,160],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*6*/
        id: 6,
        name: "bone",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [200,160],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*7*/
        id: 7,
        name: "goldcoin",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [280,120],
        width: 40,
        height: 40,
        type: CURRENCY,
    },
];

export const PORTALS = [
    {
        /*0*/
        id: 0,
        name: "enter",
        src: "assets/images/80/objectsAndProps/items.png",
        srcpos: [280,120],
        width: 40,
        height: 40,
        type: PORTAL,
    },
]