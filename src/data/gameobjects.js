import { HEALER, EATABLE, CURRENCY, PORTAL, PORTAL_ENTER, PORTAL_LEAVE } from "../helpers/constants";

const BASE_URL = "/assets/images/80/objectsAndProps/items.png";
const PORTAL_URL = "/assets/images/80/objectsAndProps/portal.png"; 
const ENTER_URL = "/assets/images/80/objectsAndProps/enter.png"; 
const LEAVE_URL = "/assets/images/80/objectsAndProps/leave.png"; 


export const GAMEOBJECTS = [
    {
        /*0*/
        id: 0,
        name: "redpotion",
        src: BASE_URL,
        srcpos: [0,0],
        width: 40,
        height: 40,
        type: HEALER,
    },

    {
        /*1*/
        id: 1,
        name: "vaccine",
        src: BASE_URL,
        srcpos: [200,0],
        width: 40,
        height: 40,
        type: HEALER,
    },

    {
        /*2*/
        id: 2,
        name: "water",
        src: BASE_URL,
        srcpos: [240,0],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*3*/
        id: 3,
        name: "berry",
        src: BASE_URL,
        srcpos: [240,280],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*4*/
        id: 4,
        name: "diamond",
        src: BASE_URL,
        srcpos: [240,200],
        width: 40,
        height: 40,
        type: CURRENCY,
    },

    {
        /*5*/
        id: 5,
        name: "meat",
        src: BASE_URL,
        srcpos: [280,160],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*6*/
        id: 6,
        name: "bone",
        src: BASE_URL,
        srcpos: [200,160],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*7*/
        id: 7,
        name: "goldcoin",
        src: BASE_URL,
        srcpos: [280,120],
        width: 40,
        height: 40,
        type: CURRENCY,
    },

    {
        id:8,
        name:'hen',
        src:'/assets/images/80/objectsAndProps/hen.png',
        srcpos: [0,0],
        width: 16,
        height: 18,
        effects: "spotanimate",
        type: "HEN",
    },
];

export const PORTALS = [

    {   /*0*/
        id: 0,
        name: PORTAL_ENTER,
        src: ENTER_URL,
        srcpos: [0,0],
        width: 40,
        height: 40,
        effects: "blink",
        type: PORTAL,
    },

    {   /*1*/
        id: 1,
        name: PORTAL_LEAVE,
        src: LEAVE_URL,
        srcpos: [0,0],
        width: 40,
        height: 40,
        effects: "blink",
        type: PORTAL,
    },

    {   /*2*/
        id: 2,
        name: "portal",
        src: PORTAL_URL,
        srcpos: [0,0],
        width: 64,
        height: 64,
        effects: "rotate",
        type: PORTAL,
    },
    
]