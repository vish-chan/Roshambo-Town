import { CAVE_MUSIC, MAPS_BASE } from "../../helpers/constants";

export const cave = {

    tiles: [
        [  10,  10,  10,  10,  10,],
        [   0,   0,   0,   0,   0,],
        [   0,   0,   0,   0,   0,],
        [   0,   0,   0,   0,   0,],
        [   0,   0,   0,   0,  10,],


    ],

    src: `${MAPS_BASE}/cave.png`,

    backgroundColor: "#ffffff",
    audioSrc: CAVE_MUSIC,
}