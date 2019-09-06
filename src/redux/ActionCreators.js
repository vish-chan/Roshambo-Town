import * as ActionTypes from './ActionTypes';
import { TOTAL_MOVEMENT_SIZE, FRAME_MOVEMENT_SIZE, VIEWPORT_BOUNDARY, LEFT, RIGHT, UP, DOWN, 
        SPRITE_LOC_LEFT, SPRITE_LOC_RIGHT, SPRITE_LOC_DOWN, SPRITE_LOC_UP, ANIMATION_STEPS, TILE_SIZE, PLAYER_SPRITE_SIZE,
        PASSIBLE_INDEX, 
        VIEWPORT_WIDTH,
        VIEWPORT_HEIGHT, CAMERA} from '../helpers/constants';
import {tileToMapCoordinates, mapToViewport, mapCoordinatesToTiles} from '../helpers/funcs';
import { store } from '../redux/ConfigureStore';



const observeViewPortBoundaries = (newpos, mapstart) => {
    const viewportPos = mapToViewport(newpos, mapstart);
    return (viewportPos[0]>=0 && viewportPos[0]<=VIEWPORT_BOUNDARY[0] - PLAYER_SPRITE_SIZE) &&
            (viewportPos[1]>=0 && viewportPos[1]<=VIEWPORT_BOUNDARY[1] - PLAYER_SPRITE_SIZE);
}

const observeMapBoundaries = (newpos, mapwidth, mapheight) => {
    return (newpos[0]>=0 && newpos[0]<=mapwidth - PLAYER_SPRITE_SIZE) &&
            (newpos[1]>=0 && newpos[1]<=mapheight - PLAYER_SPRITE_SIZE);
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
    let oldpos = getState().player.position, newpos = [];
    let mapstart = getState().viewport.start, mapend = getState().viewport.end;
    let direction, spriteLocation, steps = ANIMATION_STEPS;

    if(keyCode === 37) {
        direction = LEFT;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_LEFT;
    } else if(keyCode === 39) {
        direction = RIGHT;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_RIGHT;
    } else if(keyCode === 38) {
        direction = UP;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_UP;
    } else if(keyCode === 40) {
        direction = DOWN;
        newpos = getNewPostion(oldpos, direction, TOTAL_MOVEMENT_SIZE);
        spriteLocation = SPRITE_LOC_DOWN;
    }

    if(getState().player.direction!==direction)
        dispatch(UpdatePlayerDirectionAction(direction, spriteLocation));

    if(observeViewPortBoundaries(newpos, mapstart) && observeImpassible(getState().map.tiles, newpos) && observeNPC(newpos, getState().npc)) {
        dispatch(UpdatePlayerAnimationAction(true, newpos));
        if(observeCamera(oldpos, direction, mapstart) && mapScrollable(direction, mapstart, mapend)) {
            requestAnimationFrame(animatePlayerOnSpot);
        } else {
            requestAnimationFrame(animatePlayer);
        }
    }

    function animatePlayer() {
        if(steps === 0) {
            store.dispatch(UpdatePlayerAnimationAction(false));
            return;
        } 
        newpos = getNewPostion(oldpos, direction, FRAME_MOVEMENT_SIZE);
        store.dispatch(UpdatePlayerPositionAction(newpos));
        oldpos = newpos;
        steps--;
        requestAnimationFrame(animatePlayer);
    }
    
    function animatePlayerOnSpot() {
        if(steps === 0) {
            store.dispatch(UpdatePlayerAnimationAction(false));
            return;
        } 
        newpos = getNewPostion(oldpos, direction, FRAME_MOVEMENT_SIZE);
        store.dispatch(UpdatePlayerPositionAction(newpos));
        oldpos = newpos;
        mapstart = getNewOrigin(mapstart, direction, FRAME_MOVEMENT_SIZE);
        store.dispatch(UpdateOriginAction(mapstart));
        steps--;
        requestAnimationFrame(animatePlayerOnSpot);
    }
}

const getDirection = (oldpos, newpos, oldirection) => {
    if(oldpos[0] === newpos[0]) {
        if(oldpos[1] > newpos[1])
            return [UP, SPRITE_LOC_UP];
        else if(oldpos[1] < newpos[1])
            return [DOWN, SPRITE_LOC_DOWN];
        else return [oldirection];
    } else if(oldpos[1] === newpos[1]) {
        if(oldpos[0] > newpos[0])
            return [LEFT, SPRITE_LOC_LEFT];
        else if(oldpos[0] < newpos[0])
            return [RIGHT, SPRITE_LOC_RIGHT];
    } else return oldirection;
}

export const UpdateNPCListPosition = () => (dispatch, getState) => {
    const npcList = getState().npc;
    for(let i=0; i<npcList.length;i++) {
        UpdateNPCPosition(i)(dispatch, getState);
    }
}

export const UpdateNPCPosition = (npcId) => (dispatch, getState) => {
    let npc = getState().npc[npcId];
    if(npc.stationary ||  npc.isAnimating)
        return;
        
    let oldpos = npc.position;
    let curdirection = npc.direction, steps = ANIMATION_STEPS;
    const pathArr = npc.pathArr;
    let pathIdx = npc.pathIdx;
    let pathDir = npc.pathDir;
    let newpos = tileToMapCoordinates(pathArr[pathIdx+pathDir], TILE_SIZE);
    let newdirection = getDirection(oldpos, newpos, curdirection);
    if(curdirection!=newdirection[0]) {
        dispatch(UpdateNPCDirectionAction(npcId, newdirection[0], newdirection[1]));
    }

    const map = getState().map;
    
    if(observeMapBoundaries(newpos, map.width, map.height) && 
                                            observeImpassible(map.tiles, newpos) && 
                                            observeNPC(newpos, getState().npc) && 
                                            observePlayer(newpos, getState().player)) {
        dispatch(UpdateNPCAnimationAction(npcId, true, newpos));
        requestAnimationFrame(animateNPC)
    }

    function animateNPC() {
        if(steps === 0) {
            store.dispatch(UpdateNPCAnimationAction(npcId, false));
            return;
        } 
        newpos = getNewPostion(oldpos, newdirection[0], FRAME_MOVEMENT_SIZE);
        store.dispatch(UpdateNPCPositionAction(npcId, newpos));
        oldpos = newpos;
        steps--;
        requestAnimationFrame(animateNPC);
    }
}

export const AddMap = (map) => (dispatch) => {
    let width = map.tiles[0].length*TILE_SIZE, height= map.tiles.length*TILE_SIZE;
    let playerPosition = tileToMapCoordinates(map.player.position, TILE_SIZE);
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

    const offScreenCanvas = new OffscreenCanvas(width, height);
    const offscreenctx = offScreenCanvas.getContext("2d");
    offscreenctx.fillStyle = map.backgroundColor;
    offscreenctx.fillRect(0, 0, width, height);
    renderTiles(offscreenctx);

    function renderTiles(ctx) {
        const tiles = map.tiles;
        const objectsSprite = new Image();
        objectsSprite.src = map.sprites.src;
        objectsSprite.onload = renderTiles;

        function renderTiles(){
            for(var i=0; i<tiles.length; i++) {
                for(var j=0; j<tiles[0].length; j++) {
                    if(tiles[i][j]>=0) {
                        const tile = map.sprites.indices[tiles[i][j]];
                        ctx.drawImage(objectsSprite, tile[0], tile[1], tile[2], tile[3], j*TILE_SIZE, i*TILE_SIZE,  tile[2], tile[3]);
                    }
                }
            }
            dispatch(AddMapAction(map, width, height, playerPosition, start, end, offScreenCanvas));
        }
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

const UpdatePlayerDirectionAction = (direction, spriteLocation) => {
    return({
        type: ActionTypes.UPDATE_PLAYER_DIRECTION,
        payload: {
            direction,
            spriteLocation,
        }
    });
}

const UpdateNPCDirectionAction = (npcId, direction, spriteLocation) => {
    return({
        type: ActionTypes.UPDATE_NPC_DIRECTION,
        payload: {
            id: npcId,
            direction,
            spriteLocation,
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

export const AddMapAction = (map, width, height ,playerPosition, start, end, offScreenCanvas) => { 
    return({
        type: ActionTypes.ADD_MAP,
        payload: {
            tiles: map.tiles,
            width,
            height,
            canvas: offScreenCanvas,
            viewport: {
                start,
                end,
            },
            player: {
                name: map.player.name,
                skin: map.player.skin,
                position: playerPosition,
            },
            npc: map.npc,
        },
    });
}