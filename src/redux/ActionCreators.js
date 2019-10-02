import * as ActionTypes from './ActionTypes';
import { TOTAL_MOVEMENT_SIZE, LEFT, RIGHT, UP, DOWN, TILE_SIZE,
        PASSIBLE_INDEX,  VIEWPORT_WIDTH,
        VIEWPORT_HEIGHT, CAMERA, PORTAL, ROCK, PAPER, SCISSORS, BATTLE_QUESTION, BATTLE_ANS, SAVED_GAME, PORTAL_LEAVE, PORTAL_ENTER} from '../helpers/constants';
import { tileToMapCoordinates, mapToViewport, mapCoordinatesToTiles, customSetTimeout, clearIntervals } from '../helpers/funcs';


const observeMapBoundaries = (newpos, mapwidth, mapheight) => {
    return (newpos[0]>=0 && newpos[0]<=mapwidth - TILE_SIZE) &&
            (newpos[1]>=0 && newpos[1]<=mapheight - TILE_SIZE);
}

const observeImpassible = (tiles, newpos) => {
    const tile = mapCoordinatesToTiles(newpos, TILE_SIZE);
    const row = tile[0], col = tile[1];
    return (Math.abs(tiles[row][col]) <= PASSIBLE_INDEX);
}

const observeCamera = (position, direction, mapstart) => {
    const viewportPos = mapToViewport(position, mapstart);
    if(direction===LEFT || direction===RIGHT)
        return (viewportPos[0] >= CAMERA[0][0]) && (viewportPos[0] <= CAMERA[0][1])
    else if(direction===UP || direction===DOWN)
        return (viewportPos[1] >= CAMERA[1][0]) && (viewportPos[1] <= CAMERA[1][1])
}

const observeIdleNPC = (newpos, npcList) => {
    const npclist = npcList.filter( npc => {
        if(!npc.isAnimating)
            return (newpos[0] === npc.position[0]) && (newpos[1] === npc.position[1]);
        else
            return false;
    });

    return npclist;
}

const observeAnimatingNPC = (newpos, npcList) => {
    const npclist = npcList.filter( npc => {
        if(npc.isAnimating)
            return (newpos[0] === npc.nextPosition[0]) && (newpos[1] === npc.nextPosition[1]);
        else 
            return false;
    });

    return npclist;
}

const observeIdlePlayer = (newpos, player) => {
    if(!player.isAnimating) 
        return (newpos[0] === player.position[0]) && (newpos[1] === player.position[1]);
    else
        return false;
}

const observePlayer = (newpos, player) => {
    if(!player.isAnimating) 
        return !((newpos[0] === player.position[0]) && (newpos[1] === player.position[1]));
    else
        return !((newpos[0] === player.nextPosition[0]) && (newpos[1] === player.nextPosition[1]));
}

const mapScrollable = (direction, mapstart, mapend) => {
    switch(direction) {
        case LEFT:
            return (mapstart[0] < 0);
        case UP:
            return (mapstart[1] < 0);
        case RIGHT:
            return (mapend[0] > VIEWPORT_WIDTH);
        case DOWN:
            return (mapend[1] > VIEWPORT_HEIGHT);
        
    }
}


const getNewPostion = (oldpos, direction, movementSize) => {
    switch(direction) {
        case LEFT:
            return [oldpos[0]-movementSize, oldpos[1]];
        case RIGHT:
            return [oldpos[0]+movementSize, oldpos[1]];
        case UP:
            return [oldpos[0], oldpos[1] - movementSize];
        case DOWN:
            return [oldpos[0], oldpos[1] + movementSize];
    }
}

const getNewOrigin = (start, direction, movementSize) => {
    switch(direction) {
        case LEFT:
            return [start[0]+movementSize, start[1]];
        case RIGHT:
            return [start[0]-movementSize, start[1]];
        case UP:
            return [start[0], start[1] + movementSize];
        case DOWN:
            return [start[0], start[1] - movementSize];
    }
}


const getNPC = (npclist, npcid) => {
    return(npclist.filter(npc => npc.id===npcid)[0]);
}


export const UpdatePlayerPosition = (keyCode) => (dispatch, getState) => {
    const player = getState().player;
    let oldpos = player.position, newpos = [];
    let mapstart = getState().viewport.start, mapend = getState().viewport.end;
    const map = getState().map;
    let direction, steps = player.skin.walkSpriteCount, movemap=false;
    const frameMovementSize = TOTAL_MOVEMENT_SIZE/steps;

    if(keyCode === 37) {
        direction = LEFT;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
    } else if(keyCode === 39) {
        direction = RIGHT;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
    } else if(keyCode === 38) {
        direction = UP;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
    } else if(keyCode === 40) {
        direction = DOWN;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
    }

    if(player.direction!==direction)
        dispatch(UpdatePlayerDirectionAction(direction));

    if(observeMapBoundaries(newpos, map.width, map.height) && observeImpassible(getState().map.tiles, newpos)) {
        const idlenpc = observeIdleNPC(newpos, getState().npc.list);
        const animatingnpc = observeAnimatingNPC(newpos, getState().npc.list);
        if(idlenpc.length === 0 && animatingnpc.length===0) {
            dispatch(UpdatePlayerAnimationAction(true, newpos));
                if(observeCamera(oldpos, direction, mapstart) && mapScrollable(direction, mapstart, mapend)) {
                    movemap = true;
                    requestAnimationFrame(animatePlayer);
                } else {
                    movemap=false;
                    requestAnimationFrame(animatePlayer);
                }
        } else if(idlenpc.length > 0) {
            if(player.nearbyNPC!==idlenpc[0].id) {
                dispatch(UpdateNearbyNPCAction(idlenpc[0].id));
                if(idlenpc[0].battle && !idlenpc[0].battleFlag) {
                    dispatch(ForceBattleConversation(getState().player, idlenpc[0]));
                }
            }
        }
    }

    function animatePlayer() {
        if(steps === 0) {
            dispatch(UpdatePlayerAnimationAction(false));

            const nearByNPC = checkNearbyIdleNPC(getState().player.position, getState().player.direction, getState().npc.list);
            if(nearByNPC.length) {
                dispatch(UpdateNearbyNPCAction(nearByNPC[0].id));
                if(nearByNPC[0].battle && !nearByNPC[0].battleFlag) {
                    dispatch(ForceBattleConversation(getState().player, nearByNPC[0]));
                }
            } else if(player.nearbyNPC!==null) {
                dispatch(UpdateNearbyNPCAction());
            }

            const objects = getObjectForPickup(getState().player.position, getState().gameobjects);
            if(objects.length) {
                dispatch(UpdateNearbyGameObjAction(objects[0].id)); 
            } else if(player.nearbyGameObj!==null) {
                dispatch(UpdateNearbyGameObjAction());
            }

            const portals = getPortal(getState().player.position, getState().gameobjects);
            if(portals.length) {
                dispatch(UpdateNearbyPortalAction(portals[0].id));
            } else if(player.nearbyPortal!==null) {
                dispatch(UpdateNearbyPortalAction());
            }
            return;
        } 
        newpos = getNewPostion(oldpos, direction, frameMovementSize);
        dispatch(UpdatePlayerPositionAction(newpos));
        oldpos = newpos;
        if(movemap) {
            mapstart = getNewOrigin(mapstart, direction, frameMovementSize);
            dispatch(UpdateOriginAction(mapstart));
        }
        steps--;
        setTimeout(function() {requestAnimationFrame(animatePlayer)}, player.frameInterval);
    }
}

const getPositionEquality = (pos1, pos2) => (pos1[0]===pos2[0] && pos1[1]===pos2[1])

const getObjectForPickup = (position, gameobjects) => {
    return(gameobjects.filter(gameobject => gameobject.type.type!==PORTAL && getPositionEquality(position, gameobject.position)))
}

export const PickupGameObject = () => (dispatch, getState) => {
    const player = getState().player;
    const gameobject = player.nearbyGameObj!==null? getState().gameobjects.filter( gobj => gobj.id === player.nearbyGameObj ): null;
    if(gameobject!==null) {
        dispatch(AddObjecttoInventory(gameobject[0]));
        dispatch(UpdateNearbyGameObjAction()); 
    }
}

const getOppositeDirection = (direction) => {
    switch(direction) {
        case UP: return DOWN;
        case RIGHT: return LEFT;
        case DOWN: return UP;
        case LEFT: return RIGHT;
    }
}

const checkNearbyIdlePlayer = (npcpos, direction, player) => {
    const nextPosition = getNewPostion(npcpos, direction, TOTAL_MOVEMENT_SIZE);
    return observeIdlePlayer(nextPosition, player);
}

const checkNearbyIdleNPC = (playerpos, direction, npcList) => {
    const nextPosition = getNewPostion(playerpos, direction, TOTAL_MOVEMENT_SIZE);
    const nearByNPC = observeIdleNPC(nextPosition, npcList);
    return nearByNPC;
}


const ForceBattleConversation = (player, npc) => (dispatch, getState) => {
   
    const oppdirection = getOppositeDirection(player.direction);
    if(npc.direction!==oppdirection) {
        dispatch(UpdateNPCDirectionAction(npc.id, oppdirection));
    }
    dispatch(SetConversationStatus(npc.id, 
        {name: npc.name, dialogs: [BATTLE_QUESTION]}, 
        {name: player.name, dialogs: [BATTLE_ANS]}, 
        mapToViewport(player.position, getState().viewport.start)[1]>(VIEWPORT_HEIGHT/3)? "top": "bottom", true));

}

export const InitiateConversation = () => (dispatch, getState) => {
    const player = getState().player;
    const npc = player.nearbyNPC!==null? getNPC(getState().npc.list, player.nearbyNPC):null;
    if(npc && !npc.isAnimating) {
        const oppdirection = getOppositeDirection(player.direction);
        if(npc.direction!==oppdirection) {
            dispatch(UpdateNPCDirectionAction(npc.id, oppdirection));
        }
        if(npc.battle) {
            dispatch(SetConversationStatus(npc.id, 
                {name: player.name, dialogs: [BATTLE_QUESTION]}, 
                {name: npc.name, dialogs: [BATTLE_ANS]}, 
                mapToViewport(player.position, getState().viewport.start)[1]>(VIEWPORT_HEIGHT/3)? "top": "bottom", true));
        } else {
            dispatch(SetConversationStatus(npc.id, 
                                        {name: player.name, dialogs: player.talk[npc.id]}, 
                                        {name: npc.name, dialogs: npc.talk}, 
                                        mapToViewport(player.position, getState().viewport.start)[1]>(VIEWPORT_HEIGHT/3)? "top": "bottom", false));
        }
    }
}



export const UpdateConversation = () => (dispatch, getState) => {
    const dialog = getState().dialog;
    if(dialog.speakerIdx===0) {
        dispatch(NextDialogAction());
        return;
    }

    let nextcontentIdx = dialog.dialogIdx + 1;
    if(nextcontentIdx<dialog.person1.dialogs.length) {
        dispatch(NextDialogAction());
    } else {
        if(dialog.battleConversation) {
            dispatch(StartBattle(getState().player, getNPC(getState().npc.list, dialog.npcId)));
        }
        dispatch(ResetConversationStatus(dialog.npcId));
    }
}

const getNewDirection = (oldpos, newpos, oldirection) => {
    if(oldpos[0] === newpos[0]) {
        if(oldpos[1] > newpos[1])
            return UP;
        else if(oldpos[1] < newpos[1])
            return DOWN;
        else return oldirection;
    } else if(oldpos[1] === newpos[1]) {
        if(oldpos[0] > newpos[0])
            return LEFT;
        else if(oldpos[0] < newpos[0])
            return RIGHT;
    } else return oldirection;
}

export const UpdateNPCPosition = (npcId) => (dispatch, getState) => {
    let npc = getNPC(getState().npc.list, npcId);
    
    if(npc.stationary ||  npc.isAnimating || npc.interacting || npc.inBattle)
        return;
    
    if(npc.isWaiting) {
        if((performance.now() - npc.lastUpdated) < npc.waitInterval) {
            return;
        }
        else 
            dispatch(ResetNPCWaiting(npcId));
    }
        
    let oldpos = npc.position;
    let curdirection = npc.direction, steps = npc.skin.walkSpriteCount;
    const frameMovementSize = TOTAL_MOVEMENT_SIZE/steps;
    let newpos = tileToMapCoordinates(npc.pathArr[npc.pathIdx + npc.pathDir], TILE_SIZE);
    let newdirection = getNewDirection(oldpos, newpos, curdirection);
    if(curdirection!==newdirection) {
        dispatch(UpdateNPCDirectionAction(npcId, newdirection));
    }

    const map = getState().map;
    
    if(observeMapBoundaries(newpos, map.width, map.height) && 
                                            observeImpassible(map.tiles, newpos) && 
                                            observePlayer(newpos, getState().player)) {

        const idlenpc = observeIdleNPC(newpos, getState().npc.list);
        const animatingnpc = observeAnimatingNPC(newpos, getState().npc.list);
        if(idlenpc.length === 0 && animatingnpc.length===0) {
            dispatch(UpdateNPCAnimationAction(npcId, true, newpos));
            requestAnimationFrame(animateNPC)
        }
    }

    function animateNPC() {
        if(steps === 0) {
            dispatch(UpdateNPCAnimationAction(npcId, false));
            const player = getState().player;
            let npc = getNPC(getState().npc.list, npcId);
            if(checkNearbyIdlePlayer(npc.position, npc.direction, player)) {
                if(player.direction===getOppositeDirection(npc.direction)) {
                    dispatch(UpdateNearbyNPCAction(npc.id));
                    if(npc.battle && !npc.battleFlag) {
                        dispatch(ForceBattleConversation(getState().player, npc));
                    }
                }
            } else if(player.nearbyNPC===npc.id) {
                dispatch(UpdateNearbyNPCAction());
            }
            return;
        } 
        newpos = getNewPostion(oldpos, newdirection, frameMovementSize);
        dispatch(UpdateNPCPositionAction(npcId, newpos));
        oldpos = newpos;
        steps--;
        customSetTimeout(function() {requestAnimationFrame(animateNPC)}, npc.frameInterval, npc.id);
    }
}

const getPortal = (position, gameobjects) => {
    return(gameobjects.filter(gameobject => gameobject.type.type===PORTAL && getPositionEquality(position, gameobject.position)))
}

export const CheckPortalAndEnter = () => (dispatch, getState) =>{
    const player = getState().player;
    const portals = player.nearbyPortal!==null? getState().gameobjects.filter( gobj => gobj.id === player.nearbyPortal ): null;
    if(portals!==null) {
        if(portals[0].type.name===PORTAL_ENTER) {
            const portal = portals[0];
    
            dispatch(SaveStateInitAction());
            clearIntervals();
            
            saveStateandAddMap();
            
                function saveStateandAddMap() { 
                    const npcList = getState().npc.list;
                    const npcAnimating = npcList.filter( npc => npc.isAnimating);
                    if(npcAnimating.length > 0) {
                        setTimeout(saveStateandAddMap, 500);
                    } else {
                        dispatch(SaveStateAction(getState())); 
                        dispatch(AddMap(portal.target, true));
                    }
                }
        } else if(portals[0].type.name===PORTAL_LEAVE) {
            const oldState = getState().statemanager.prevState;
            if(!oldState)
                return;

            const mapname = getState().map.name;
            const gameobjects = getState().gameobjects.map( gameobject => {
                return({
                    ...gameobject,
                    position: mapCoordinatesToTiles(gameobject.position, TILE_SIZE),
                });
            });
            dispatch(SaveStateInitAction()); 
            clearInterval();
            checkandRestoreMap();
                
                function checkandRestoreMap() { 
                    const npcList = getState().npc.list;
                    const npcAnimating = npcList.filter( npc => npc.isAnimating);
                    if(npcAnimating.length > 0) {
                        setTimeout(checkandRestoreMap, 500);
                    } else {
                        dispatch(LoadingMapAction());
                        const mapBg = new Image();
                        mapBg.onload = renderMap;
                        mapBg.src = oldState.map.src;
                        function renderMap(){
                            dispatch(RestoreStateAction(mapname, gameobjects, oldState));
                        }  
                    }
                }
            }   
    }
}

export const SaveGameToDisk = () => (dispatch, getState) => {
    
    dispatch(SaveStateInitAction());
    clearIntervals();
    saveStateToLocalStorage();
        
    function saveStateToLocalStorage() { 
        const npcList = getState().npc.list;
        const npcAnimating = npcList.filter( npc => npc.isAnimating);
        if(npcAnimating.length > 0) {
            setTimeout(saveStateToLocalStorage, 500);
        } else {
            try {
                const serializedState = JSON.stringify(getState());
                localStorage.setItem(SAVED_GAME, serializedState);
                alert("Game saved successfully!");
              } catch (err) {
                alert("Saving state failed! Try starting a new game.");
              } 
            dispatch(SaveStateEndAction());
        }
    }
}

export const LoadGameFromDisk = () => (dispatch) => {
    try {
        const serializedState = localStorage.getItem(SAVED_GAME);
    
        if (serializedState === null) {
          return undefined;
        }
    
        const state =  JSON.parse(serializedState);
        dispatch(LoadingMapAction());
        const mapBg = new Image();
        mapBg.onload = renderMap;
        mapBg.src = state.map.src;
        function renderMap(){
            dispatch(RestoreStateFromDiskAction(state));
        }  
    
      } catch (err) {
            alert("Loading state failed. Start a new game!");
            return undefined;
      }
      return 1;
}

export const AddMap = (level, secondary=false) => (dispatch, getState) => {
    dispatch(LoadingMapAction());

    let width = level.map.tiles[0].length*TILE_SIZE, height= level.map.tiles.length*TILE_SIZE;
    let playerPosition = tileToMapCoordinates(level.player.position, TILE_SIZE);
    let start_x, start_y, end_x, end_y;
    if(width <= VIEWPORT_WIDTH) {
        start_x = VIEWPORT_WIDTH/2 - width/2;
        end_x = start_x + width;
    } else {
        start_x = (VIEWPORT_WIDTH/2) - playerPosition[0] - TILE_SIZE;
        start_x = start_x >=0? 0: start_x;
        end_x = start_x + width;
        if(end_x < VIEWPORT_WIDTH) {
            end_x = VIEWPORT_WIDTH;
            start_x = end_x - width;
        }
    }
    if(height <= VIEWPORT_HEIGHT) {
        start_y = VIEWPORT_HEIGHT/2 - height/2;
        end_y = start_y + height;
    } else {
        start_y = (VIEWPORT_HEIGHT/2)-playerPosition[1] - TILE_SIZE;
        start_y = start_y >=0? 0: start_y;
        end_y = start_y + height
        if(end_y < VIEWPORT_HEIGHT) {
            end_y = VIEWPORT_HEIGHT;
            start_y = end_y - height;
        }
    }
    
    let start = [ start_x, start_y ];
    let end = [end_x, end_y];

    let oldState = null;
    if(secondary) {
        const sm = getState().statemanager;
        oldState = level.name in sm? sm[level.name]: null; 
    }

    const mapBg = new Image();
    mapBg.onload = renderMap;
    mapBg.src = level.map.src;

    function renderMap(){
        dispatch(AddMapAction(level, width, height, playerPosition, start, end, oldState));
    }
}


export const SetPlayerInfoAction = (name, skinIdx) => {
    return({
        type: ActionTypes.SET_PLAYER_INFO,
        payload : {
            name,
            skinIdx
        }
    })
}


const StartBattle = (player, npc) => {
    return({
        type: ActionTypes.START_BATTLE,
        payload: {
            player,
            npc,
        }
    });
} 

const BattleGetRandomMove = (maxMove) => {
    return (Math.floor(Math.random() * maxMove) % (maxMove+1));
}

const BattleGetPredictedMoveIdx = (arr) => {
    return(arr.reduce((maxIdx, currVal, currIdx, arr) => currVal > arr[maxIdx]? currIdx: maxIdx, 0));
}

const BattleGetWinningMove = (move, maxMove) => {
    switch(move) {
        case ROCK: return PAPER;
        case PAPER: return SCISSORS;
        case SCISSORS: return ROCK;
        default: return BattleGetRandomMove(maxMove);
    }
}

const BattleGetNextMove = (markovMatrix, lastMove) => {
    const maxMove = markovMatrix.length - 1;
    let nextMove, predictedMoveIdx;
    if(lastMove===null) {
        nextMove = BattleGetRandomMove(maxMove);
    } else {
        predictedMoveIdx = BattleGetPredictedMoveIdx(markovMatrix[lastMove]);
        if(markovMatrix[lastMove][predictedMoveIdx]===0) {
            nextMove = BattleGetRandomMove(maxMove);
        } else {
            nextMove =  BattleGetWinningMove(predictedMoveIdx);
        }
    }
    return nextMove;
}

const BattleGetWinner = (playermove, npcmove) => {
        if(playermove===ROCK) {
            if(npcmove===SCISSORS) 
                return 1; //player won
            else if(npcmove===PAPER)
                return -1; //npc won
            else 
                return 0 //draw
        } else if(playermove===PAPER) {
            if(npcmove===ROCK) 
                return 1; //player won
            else if(npcmove===SCISSORS)
                return -1; //npc won
            else
                return 0 //draw
        } else if(playermove===SCISSORS) {
            if(npcmove===PAPER)
                return 1; //player won
            else if(npcmove===ROCK)
                return -1; //npc won
            else
                return 0 //draw
        }
}

export const BattleMoveIndexToStr = (move) => {
    switch(move) {
        case 0: return "ROCK";
        case 1: return "PAPER";
        case 2: return "SCISSORS";
        default: return "Undefined";
    }
}

const BattleSummary = (playername, playermove, npcname, npcmove, winner) => {
    const playerline = playername + " chose "+ BattleMoveIndexToStr(playermove) + ". ";
    const npcline = npcname+ " chose "+ BattleMoveIndexToStr(npcmove)+". ";
    let winnerline; 
    if(winner===1) {
        winnerline = playername + " wins this round!";
    } else if(winner===-1) {
        winnerline = npcname+ " wins this round!";
    } else {
        winnerline = "Its a DRAW!";
    }
    return(playerline+npcline+winnerline);
}

export const BattleHandleMove = (playerMove) => (dispatch, getState) => {
    
    let battle = getState().battle;
    const playerMarkovMatrix = battle.player.markovMatrix;
    const playerLastMove = battle.player.lastMove;
    const npcMove = BattleGetNextMove(playerMarkovMatrix, playerLastMove);
    const winner = BattleGetWinner(playerMove, npcMove);
    const summary = BattleSummary(battle.player.name, playerMove, battle.npc.name, npcMove, winner);
    dispatch(UpdateBattleStatsAction(playerMove, npcMove, winner, summary));

    const finalWinner = CheckBattleWinner(getState().battle);
    if(finalWinner!=0) {
        battle = getState().battle;
        let newexp = battle.player.exp + getPlayerNewExp(battle.player.score, battle.player.level, battle.npc.level);
        let newlevel = getPlayerLevel(newexp);
        setTimeout( function(){ dispatch(EndBattle(finalWinner, {newlevel, newexp}, battle.npc.id))}, 1500);
    }
}

const getPlayerNewExp = (score, playerLevel, npcLevel) => {
    const BASE_EXP = 5, LEVEL_MULTIPLIER = 10;
    return(BASE_EXP + score + Math.max((npcLevel - (playerLevel-1))*LEVEL_MULTIPLIER, LEVEL_MULTIPLIER));
}

const getPlayerLevel = (exp) => {
    if(exp < 50) 
        return 1;
    else if(exp < 120)
        return 2;
    else if(exp < 250)
        return 3;
    else if(exp < 420)
        return 4;
    else 
        return 5;
}

const CheckBattleWinner = (battle) => {
    if(battle.player.lives===0) {
        return -1;
    } else if(battle.npc.lives===0) {
        return 1;
    } else {
        return 0;
    }
}

const EndBattle = (battleWinner, updatedPlayerStats, npcId) => {
    return({
        type: ActionTypes.END_BATTLE,
        payload: {
            battleWinner,
            player: updatedPlayerStats,
            npcId,
        }
    });
}

export const CloseBattle = () => {
    return({
        type: ActionTypes.CLOSE_BATTLE,
    });
}

export const BattleEndIntro = () => {
    return({
        type: ActionTypes.END_BATTLE_INTRO,
    });
}



const UpdateBattleStatsAction = (playermove, npcmove, winner, summary) => {
    return({
        type: ActionTypes.SUBMIT_MOVES,
        payload: {
            playermove,
            npcmove,
            winner,
            summary,
        }
    });
}

const UpdatePlayerAnimationAction = (isAnimating, newpos = []) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_ANIMATION,
        payload: {
            isAnimating,
            newpos,
        }
    });
}

const UpdateNPCAnimationAction = (id, isAnimating, newpos = []) => {
    return({
        type: ActionTypes.UPDATE_NPC_ANIMATION,
        payload: {
            id,
            isAnimating,
            newpos,
        }
    });
}

const UpdatePlayerPositionAction = (position) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_POSITION,
        payload: {
            position,
        }
    });
}

const UpdateNPCPositionAction = (npcId, position) => {
    return({
        type: ActionTypes.UPDATE_NPC_POSITION,
        payload: {
            id: npcId,
            position,
        }
    });
}

const UpdatePlayerDirectionAction = (direction) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_DIRECTION,
        payload: {
            direction,
        }
    });
}

const UpdateNearbyNPCAction = (npcId=null) => {
    return({
        type: ActionTypes.UPDATE_NEARBY_NPC,
        payload: {
            npcId: npcId,
        }
    });
}

const UpdateNearbyGameObjAction = (gameobjId=null) => {
    return({
        type: ActionTypes.UPDATE_NEARBY_GAMEOBJ,
        payload: {
            id: gameobjId,
        }
    });
}

const UpdateNearbyPortalAction = (portalId=null) => {
    return({
        type: ActionTypes.UPDATE_NEARBY_PORTAL,
        payload: {
            id: portalId,
        }
    });
}

const UpdateNPCDirectionAction = (npcId, direction) => {
    return({
        type: ActionTypes.UPDATE_NPC_DIRECTION,
        payload: {
            id: npcId,
            direction,
        }
    });
}

const ResetNPCWaiting = (npcId) => {
    return({
        type: ActionTypes.RESET_NPC_WAITING,
        payload: {
            id: npcId,
        }
    });
}

export const UpdateOriginAction = (origin) => {
    return({
        type: ActionTypes.UPDATE_MAP_ORIGIN,
        payload: {
            origin
        },
    });
}


const SetConversationStatus = (npcId, person1, person2, position, battleConversation) => {
    return({
        type: ActionTypes.SET_DIALOG_STATUS,
        payload: {
            person1,
            person2,
            npcId,
            position,
            battleConversation,
        }
    });
}

const ResetConversationStatus = (npcId) => {
    return({
        type: ActionTypes.RESET_DIALOG_STATUS,
        payload: {
            npcId,
        }
    });
}

const NextDialogAction = () => {
    return({
        type: ActionTypes.NEXT_DIALOG,
    })
}

export const ToggleInventory = () => {
    return({
        type: ActionTypes.TOGGLE_INVENTORY_DISPLAY,
    })
}

const AddObjecttoInventory = (object) => {
    return({
        type: ActionTypes.ADD_OBJECT_TO_INVENTORY,
        payload: {
            object,
        }
    });
}


const SaveStateInitAction = () => {
    return({
        type: ActionTypes.SAVE_STATE_INITIATED,
    })
}

const SaveStateAction = (state) => {
    return({
        type: ActionTypes.SAVE_STATE,
        payload: {
            state,
        }
    })
}

const SaveStateEndAction = () => {
    return({
        type: ActionTypes.SAVE_STATE_END,
    })
}


const RestoreStateAction = (mapname, gameobjects, state) => {
    return({
        type: ActionTypes.RESTORE_STATE,
        payload: {
            mapname,
            gameobjects,
            state,
        }
    })
}

const RestoreStateFromDiskAction = (state) => {
    return({
        type: ActionTypes.RESTORE_STATE_FROM_DISK,
        payload: {
            state,
        }
    })
}

const LoadingMapAction = () => {
    return({
        type: ActionTypes.MAP_LOADING,
    });
}


export const AddMapAction = (level, width, height ,playerPosition, vpstart, vpend, oldState=null) => { 
    return({
        type: ActionTypes.ADD_MAP,
        payload: {
            name: level.name,
            tiles: level.map.tiles,
            width,
            height,
            src: level.map.src,
            viewport: {
                start: vpstart,
                end: vpend,
            },
            player: {
                ...level.player,
                position: playerPosition,
            },
            npc: level.npc,
            gameobjects: oldState? oldState.gameobjects: level.gameobjects.concat(level.portals),
        },
    });
}