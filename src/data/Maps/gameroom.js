import { GAMEROOM_MUSIC, MAPS_BASE } from "../../helpers/constants";

export const gameroom = {

    tiles: [
        [  10,  10,  10,  10,  10,],
        [   0,   0,   0,   0,  10,],
        [  10,   0,   0,   0,  10,],
        [   0,   0,   0,   0,   0,],
        [   0,  10,   0,  10,   0,],


    ],

    src: `${MAPS_BASE}/gameroom.png`,

    backgroundColor: "#ffffff",

    audioSrc: GAMEROOM_MUSIC,
}