import * as ActionTypes from './ActionTypes';
import { TOTAL_MOVEMENT_SIZE, LEFT, RIGHT, UP, DOWN, TILE_SIZE,
        PASSIBLE_INDEX,  VIEWPORT_WIDTH,
        VIEWPORT_HEIGHT, CAMERA, PORTAL} from '../helpers/constants';
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

const observeNPC = (newpos, npcList) => {
    const impassible = npcList.filter( npc => {
        if(!npc.isAnimating)
            return (newpos[0] === npc.position[0]) && (newpos[1] === npc.position[1]);
        else
            return (newpos[0] === npc.nextPosition[0]) && (newpos[1] === npc.nextPosition[1]);
    });

    return impassible.length === 0;
}

const observeIdleNPC = (position, npcList) => {
    const npcForDialog = npcList.filter( npc => {
        if(!npc.isAnimating) {
            return(position[0] === npc.position[0] && position[1] === npc.position[1]);
        } else return false;
    });

    return npcForDialog;
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


export const UpdatePlayerPosition = (keyCode) => (dispatch, getState) => {
    const player = getState().player;
    let oldpos = player.position, newpos = [];
    let mapstart = getState().viewport.start, mapend = getState().viewport.end;
    const map = getState().map;
    let direction, steps = player.skin.walkSpriteCount;
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

    if(observeMapBoundaries(newpos, map.width, map.height) && observeImpassible(getState().map.tiles, newpos) && observeNPC(newpos, getState().npc.list)) {
        dispatch(UpdatePlayerAnimationAction(true, newpos));
        if(observeCamera(oldpos, direction, mapstart) && mapScrollable(direction, mapstart, mapend)) {
            requestAnimationFrame(animatePlayerOnSpot);
        } else {
            requestAnimationFrame(animatePlayer);
        }
    }

    function animatePlayer() {
        if(steps === 0) {
            dispatch(UpdatePlayerAnimationAction(false));
            return;
        } 
        newpos = getNewPostion(oldpos, direction, frameMovementSize);
        dispatch(UpdatePlayerPositionAction(newpos));
        oldpos = newpos;
        steps--;
        setTimeout(function() {requestAnimationFrame(animatePlayer)}, player.frameInterval);
    }
    
    function animatePlayerOnSpot() {
        if(steps === 0) {
            dispatch(UpdatePlayerAnimationAction(false));
            return;
        } 
        newpos = getNewPostion(oldpos, direction, frameMovementSize);
        dispatch(UpdatePlayerPositionAction(newpos));
        oldpos = newpos;
        mapstart = getNewOrigin(mapstart, direction, frameMovementSize);
        dispatch(UpdateOriginAction(mapstart));
        steps--;
        setTimeout(function() {requestAnimationFrame(animatePlayerOnSpot)}, player.frameInterval);
    }
}

const getPositionEquality = (pos1, pos2) => (pos1[0]===pos2[0] && pos1[1]===pos2[1])

const getObjectForPickup = (position, gameobjects) => {
    return(gameobjects.filter(gameobject => gameobject.type.type!==PORTAL && getPositionEquality(position, gameobject.position)))
}

export const PickupGameObject = () => (dispatch, getState) => {
    const player = getState().player;
    const gameobjects = getState().gameobjects;
    const objects = getObjectForPickup(player.position, gameobjects);
    if(objects.length>0) {
        const object = objects[0];
        dispatch(AddObjecttoInventory(object)); 
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

const checkNearbyIdleNPC = (playerpos, direction, npcList) => {
    const nextPosition = getNewPostion(playerpos, direction, TOTAL_MOVEMENT_SIZE);
    const nearByNPC = observeIdleNPC(nextPosition, npcList);
    return nearByNPC;
}

export const InitiateConversation = () => (dispatch, getState) => {
    const player = getState().player, npcList = getState().npc.list;
    const nearByNPC = checkNearbyIdleNPC(player.position, player.direction, npcList);
    if(nearByNPC.length) {
        const npc = nearByNPC[0];
        const oppdirection = getOppositeDirection(player.direction);
        if(npc.direction!==oppdirection) {
            dispatch(UpdateNPCDirectionAction(npc.id, oppdirection));
        }
        dispatch(SetConversationStatus(npc.id, 
                                    {name: player.name, dialogs: player.talk[npc.id]}, 
                                    {name: npc.name, dialogs: npc.talk}, 
                                    mapToViewport(player.position, getState().viewport.start)[1]>(VIEWPORT_HEIGHT/4)? "top": "bottom"));
        
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
    let npc = getState().npc.list[npcId];
    
    if(npc.stationary ||  npc.isAnimating || npc.interacting)
        return;
    
    if(npc.isWaiting) {
        if((performance.now() - npc.lastUpdated) < npc.waitInterval)
            return;
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
                                            observeNPC(newpos, getState().npc.list) && 
                                            observePlayer(newpos, getState().player)) {
        dispatch(UpdateNPCAnimationAction(npcId, true, newpos));
        requestAnimationFrame(animateNPC)
    }

    function animateNPC() {
        if(steps === 0) {
            dispatch(UpdateNPCAnimationAction(npcId, false));
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
    const player = getState().player, gameobjects = getState().gameobjects;
    const portals = getPortal(player.position, gameobjects);
    if(portals.length > 0) {
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

        dispatch(LoadingMapAction());
    }
}

export const RestoreState = () => (dispatch, getState) => {
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
            const mapBg = new Image();
            mapBg.onload = renderMap;
            mapBg.src = oldState.map.src;

            function renderMap(){
                dispatch(RestoreStateAction(mapname, gameobjects, oldState));
            }
            
        }
    }
    dispatch(LoadingMapAction());
}


export const SaveState = () => (dispatch, getState) => {
    
    dispatch(SaveStateInitAction());
    clearIntervals();
    setTimeout(function() { 
        dispatch(SaveStateAction(getState())); 
        dispatch(SaveStateEndAction());
    }, 
    3000);
}

export const AddMap = (level, secondary=false) => (dispatch, getState) => {
    let width = level.map.tiles[0].length*TILE_SIZE, height= level.map.tiles.length*TILE_SIZE;
    let playerPosition = tileToMapCoordinates(level.player.position, TILE_SIZE);
    let start_x = (VIEWPORT_WIDTH/2) - playerPosition[0] - TILE_SIZE, start_y = (VIEWPORT_HEIGHT/2)-playerPosition[1] - TILE_SIZE;
    let start = [ start_x>=0? 0: start_x, start_y>=0? 0: start_y];
    let end_x = start[0]+width, end_y = start[1]+height;
    if(end_x < VIEWPORT_WIDTH) {
        end_x = VIEWPORT_WIDTH;
        start[0] = end_x - width;
    }
    if(end_y < VIEWPORT_HEIGHT) {
        end_y = VIEWPORT_HEIGHT;
        start[1] = end_y - height;
    }
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


const SetConversationStatus = (npcId, person1, person2, position) => {
    return({
        type: ActionTypes.SET_DIALOG_STATUS,
        payload: {
            person1,
            person2,
            npcId,
            position,
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

const LoadingMapAction = () => {
    return({
        type: ActionTypes.MAP_LOADING,
    });
}


export const AddMapAction = (level, width, height ,playerPosition, start, end, oldState=null) => { 
    return({
        type: ActionTypes.ADD_MAP,
        payload: {
            name: level.name,
            tiles: level.map.tiles,
            width,
            height,
            src: level.map.src,
            viewport: {
                start,
                end,
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