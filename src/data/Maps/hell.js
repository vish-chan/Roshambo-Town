import { HELL_MUSIC, MAPS_BASE } from "../../helpers/constants";

export const hell = {

    tiles: [
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,],
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,],
        [  10,  10,  10,   0,   0,   0,  10,  10,  10,],
        [  10,  10,   0,   0,   0,   0,   0,  10,  10,],
        [  10,  10,   0,   0,   0,   0,   0,  10,  10,],
        [  10,  10,   0,   0,   0,   0,  10,  10,  10,],
        [  10,  10,  10,  10,   0,  10,  10,  10,  10,],
        [  10,  10,  10,  10,   0,  10,  10,  10,  10,],
        [  10,  10,  10,  10,   0,  10,  10,  10,  10,],

    ],

    src: `${MAPS_BASE}/hell.png`,

    backgroundColor: "#ffffff",

    audioSrc: HELL_MUSIC,

}