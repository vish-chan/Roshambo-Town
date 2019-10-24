import { HOME_MUSIC, MAPS_BASE } from "../../helpers/constants";

export const hospital = {

    tiles: [
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,],
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,],
        [  10,  10,   0,  10,  10,  10,  10,   0,  10,  10,],
        [   0,   0,   0,  10,  10,  10,  10,   0,   0,   0,],
        [  10,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,  10,],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
        [   0,   0,   0,   0,  10,   0,  10,   0,   0,   0,],

    ],

    src: `${MAPS_BASE}/hospital.png`,

    backgroundColor: "#ffffff",

    audioSrc: HOME_MUSIC,
}