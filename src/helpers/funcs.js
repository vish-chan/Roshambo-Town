export const viewportToMap = (viewportpos, mapstart) => {
    return([viewportpos[0] + (-1*mapstart[0]),viewportpos[1] + (-1*mapstart[1])]);
}


export const mapToViewport = (mappos, mapstart) => {
    return([mappos[0] + mapstart[0],mappos[1] + mapstart[1]]);
}

export const tileToMapCoordinates = (tile, TILE_SIZE) => {
    return([tile[1]*TILE_SIZE, tile[0]*TILE_SIZE]);
}