import { HEALER, EATABLE, CURRENCY, PORTAL, PORTAL_ENTER, PORTAL_LEAVE, PROPS_PATH } from "../helpers/constants";

const ITEMS_URL =  `${PROPS_PATH}/items.png`;
const PORTAL_URL = `${PROPS_PATH}/portal.png`; 
const ENTER_URL = `${PROPS_PATH}/enter.png`; 
const LEAVE_URL = `${PROPS_PATH}/leave.png`; 


export const GAMEOBJECTS = [
    {
        /*0*/
        id: 0,
        name: "redpotion",
        src: ITEMS_URL,
        srcpos: [0,0],
        width: 40,
        height: 40,
        type: HEALER,
    },

    {
        /*1*/
        id: 1,
        name: "vaccine",
        src: ITEMS_URL,
        srcpos: [200,0],
        width: 40,
        height: 40,
        type: HEALER,
    },

    {
        /*2*/
        id: 2,
        name: "water",
        src: ITEMS_URL,
        srcpos: [240,0],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*3*/
        id: 3,
        name: "berry",
        src: ITEMS_URL,
        srcpos: [240,280],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*4*/
        id: 4,
        name: "diamond",
        src: ITEMS_URL,
        srcpos: [240,200],
        width: 40,
        height: 40,
        type: CURRENCY,
    },

    {
        /*5*/
        id: 5,
        name: "meat",
        src: ITEMS_URL,
        srcpos: [280,160],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*6*/
        id: 6,
        name: "bone",
        src: ITEMS_URL,
        srcpos: [200,160],
        width: 40,
        height: 40,
        type: EATABLE,
    },

    {
        /*7*/
        id: 7,
        name: "goldcoin",
        src: ITEMS_URL,
        srcpos: [280,120],
        width: 40,
        height: 40,
        type: CURRENCY,
    },

    {
        id:8,
        name:'hen',
        src:'assets/images/80/objectsAndProps/hen.png',
        srcpos: [0,0],
        width: 32,
        height: 36,
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
        //effects: "blink",
        type: PORTAL,
    },

    {   /*1*/
        id: 1,
        name: PORTAL_LEAVE,
        src: LEAVE_URL,
        srcpos: [0,0],
        width: 40,
        height: 40,
       // effects: "blink",
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