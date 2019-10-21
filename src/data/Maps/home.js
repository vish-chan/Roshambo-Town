import { HOME_MUSIC, MAPS_BASE } from "../../helpers/constants";

export const home = {

    tiles: [
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,],
        [  10,  10,  10,  10,  10,  10,  10,  10,  10,],
        [   0,  10,  10,  10,  10,  10,  10,  10,   0,],
        [   0,   0,  10,  10,  10,  10,  10,  10,   0,],
        [   0,   0,  10,  10,  10,  10,  10,   0,   0,],
        [   0,   0,  10,  10,  10,  10,  10,   0,   0,],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,],
        [   0,   0,   0,   0,   0,   0,   0,   0,   0,],
        [   0,   0,   0,  10,   0,  10,   0,   0,   0,],

    ],

    src: `${MAPS_BASE}/home.png`,

    backgroundColor: "#ffffff",

    audioSrc: HOME_MUSIC,
}