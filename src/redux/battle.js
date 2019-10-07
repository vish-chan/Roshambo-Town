import * as ActionTypes from './ActionTypes';


const squareMatrix = (n) => {
    let matrix = [];
    for(let i=0; i<n; i++) {
        matrix.push(new Array(n).fill(0));
    }
    return matrix;
}

const BASE_LIVES = 1;


const getLives = (level) => {
    return(BASE_LIVES + (level-1)*2);
}

const INITIAL_STATE = { 
                        isOpen: false,
                        inIntro: true,
                        inEnd: false,
                        currRound: 0,
                        player: {
                            name: "Player",
                            src: "",
                            level: 1,
                            exp: 0,
                            lastMove: null,
                            score: 0,
                            lives: BASE_LIVES,
                            maxLives: BASE_LIVES,
                            markovMatrix: squareMatrix(3), 
                            initialStats: {
                                level: 1,
                                exp: 0,
                            },
                        },
                        npc: {
                            id: null,
                            name: "NPC",
                            src:"",
                            level: 1,
                            battlerType: null,
                            lastMove: null,
                            lives: BASE_LIVES,
                            maxLives: BASE_LIVES,
                            score: 0,
                        },
                        lastWinner: 0,
                        finalWinner: 0,
                        summary: "Use arrow keys to select and press Enter",
                    };

export const Battle = (state = {...INITIAL_STATE}, action) => {
    switch(action.type) {
        case ActionTypes.START_NEW_JOURNEY:
            return({
                ...INITIAL_STATE,
            });
        case ActionTypes.START_BATTLE:
            return({
                ...INITIAL_STATE,
                isOpen: true,
                player: {
                    ...INITIAL_STATE.player,
                    name: action.payload.player.name,
                    src:action.payload.player.skin.src,
                    level: action.payload.player.battle.level,
                    exp: action.payload.player.battle.exp,
                    lives: getLives(action.payload.player.battle.level),
                    maxLives: getLives(action.payload.player.battle.level), 
                    markovMatrix: squareMatrix(3), 
                    initialStats: {
                        level: action.payload.player.battle.level,
                        exp: action.payload.player.battle.exp,
                    },
                },
                npc: {
                    ...INITIAL_STATE.npc,
                    id: action.payload.npc.id,
                    name: action.payload.npc.name,
                    src: action.payload.npc.skin.src,
                    level: action.payload.npc.level,
                    battlerType: action.payload.npc.battlerType,
                    lives: getLives(action.payload.npc.level),
                    maxLives: getLives(action.payload.npc.level),  
                }
            })

        case ActionTypes.END_BATTLE_INTRO:
            return({
                ...state,
                inIntro: false,
            });
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
                lastWinner: action.payload.winner,
                summary: action.payload.summary,
            });

        case ActionTypes.END_BATTLE:
            return({
                ...state,
                inEnd: true,
                player: {
                    ...state.player,
                    level: action.payload.player.newlevel,
                    exp: action.payload.player.newexp,
                },
                finalWinner: action.payload.battleWinner,
            })
        case ActionTypes.CLOSE_BATTLE:
                return({
                    ...state,
                    isOpen: false,
                })
        default: 
            return state;
    }
}