export const viewportToMap = (viewportpos, mapstart) => {
    return([viewportpos[0] + (-1*mapstart[0]),viewportpos[1] + (-1*mapstart[1])]);
}


export const mapToViewport = (mappos, mapstart) => {
    return([mappos[0] + mapstart[0],mappos[1] + mapstart[1]]);
}

export const tileToMapCoordinates = (tile, TILE_SIZE) => {
    return([tile[1]*TILE_SIZE, tile[0]*TILE_SIZE]);
}

export const mapCoordinatesToTiles = (position, TILE_SIZE) => {
    return([position[1]/TILE_SIZE, position[0]/TILE_SIZE]);
}

export let intervalList = {};

export const customSetInterval = (func, delay, npcid) => {
    const id = setInterval(func, delay);
    intervalList["_"+npcid] = id;
    //console.log(JSON.stringify(intervalList));
}

export const clearIntervals = () => {
    var props = Object.keys(intervalList);
    for (var i = 0; i < props.length; i++) {
        clearInterval(intervalList[props[i]]);
        delete intervalList[props[i]];
    }
}

export let timeoutList = {};

export const customSetTimeout = (func, delay, npcid) => {
    const id = setTimeout(func, delay);
    timeoutList["_"+npcid] = id;
}

export const clearTimeouts = () => {
    var props = Object.keys(timeoutList);
    for (var i = 0; i < props.length; i++) {
        clearTimeout(timeoutList[props[i]]);
        delete timeoutList[props[i]];
    }
}