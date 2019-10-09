import { DOWN, GANG_MEMBER } from "../../../../helpers/constants";
import { SKINS } from '../../../skins';
import { PORTALS } from "../../../gameobjects";
import { townCenter } from '../../Maps/town_center';
import { _home } from "./_home";
import { _bakery } from "./_bakery";


export const _townCenter = {
    /* Compulsory */

    name: "townCenter",

    map: townCenter,

    /* Compulsory */
    player: {
        position: [13, 15],
        direction: 'DOWN',
        talk: [
            ["Great to be back, Dad. The town looks very different to me!", "OMG! How can we get take it back from them?", "I need some practice beofre challenging them.", "Thanks Dad."],
        ],
    },

    /* Compulsory */
    npc : [
            { 
                //informational
                id: 0,
                name: "Dad",
                skin: SKINS["prof"],
                direction: DOWN,
                stationary: true,
                pathArr: [[14,14]],
                frameInterval: 100,
                moveInterval: 500,
                waitInterval: 3000,
            },

            {
                //battle
                    id:1,
                    name: "Beast",
                    skin: SKINS["crush_2"],
                    direction: DOWN,
                    stationary: true,
                    pathArr: [[14,12], [13,26], [14,26], [15,26], [15, 25]],
                    frameInterval: 100,
                    moveInterval: 500,
                    waitInterval: 1500,
                    battle: true,
                    level: 1,
                    battlerType: GANG_MEMBER,
                },
        ],

    /* Compulsory */
    gameobjects : [
                    
    ],

    /* Compulsory */
    portals: [
        {
            position: [12, 15],
            type: PORTALS[0],
            rotate:270,
            target: _home,
        },
        {
            position: [7, 10],
            type: PORTALS[0],
            rotate:270,
            target: _bakery,
        }

    ]
};