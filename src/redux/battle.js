import * as ActionTypes from './ActionTypes';
import { start } from 'pretty-error';


const squareMatrix = (n) => {
    let matrix = [];
    for(let i=0; i<n; i++) {
        matrix.push(new Array(n).fill(0));
    }
    return matrix;
}

const MAX_ROUNDS = 10;

const INITIAL_STATE = { 
                        isOpen: true,
                        currRound: 0,
                        maxRound: MAX_ROUNDS, 
                        player: {
                            name: "Player",
                            lastMove: null,
                            score: 0,
                            lives: 10,
                            maxLives: 10,
                            markovMatrix: squareMatrix(3), 
                        },
                        npc: {
                            name: "NPC",
                            lastMove: null,
                            lives: 10,
                            maxLives: 10,
                            score: 0,
                        },
                        summary: "Use arrow keys to select and press Enter",
                    };

export const Battle = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.SUBMIT_MOVES:
            let cpyMatrix = [...state.player.markovMatrix];
            if(state.player.lastMove!==null) {
                cpyMatrix[state.player.lastMove][action.payload.playermove]+=1;   
            } 
            return({
                ...state,
                currRound: state.currRound+1,
                player: {
                    ...state.player,
                    lastMove: action.payload.playermove,
                    score: action.payload.winner===1? state.player.score+1: state.player.score,
                    lives: action.payload.winner===-1? Math.max(state.player.lives-1,0): state.player.lives,
                    markovMatrix: cpyMatrix,
                },
                npc: {
                    ...state.npc,
                    lastMove: action.payload.npcmove,
                    score: action.payload.winner===-1? state.npc.score+1: state.npc.score,
                    lives: action.payload.winner===1? Math.max(state.npc.lives-1,0): state.npc.lives,
                },
                summary: action.payload.summary,
            });
        case ActionTypes.TOGGLE_BATTLE:
            return({
                ...state,
                isOpen: !state.isOpen,
            })
        default: 
            return state;
    }
}