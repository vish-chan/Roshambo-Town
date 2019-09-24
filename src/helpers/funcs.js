import React from 'react';

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

export const printMatrix = (matrix) => {
    let print = "";
    for(let i=0; i<matrix.length;i++) {
        for(let j=0; j<matrix[0].length;j++) {
            print+=matrix[i][j]+" ,";
        }
        print+="\n";
    }
    console.log(print);
}

export const getValue = (stateparam, payloadparam) => {
    return(payloadparam!=null ? payloadparam: stateparam);
}

export const centerBgImg = (image) => {
    return({
        backgroundColor: 'white',
        backgroundImage: `url('${image}')`, 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition:'center',
        backgroundSize: 'contain',
    });
}

export const solidBorder = (size, color, radius) => {
    return({
        border: `${size}px solid ${color}`,
        borderRadius: `${radius}px`,
    });
}


export const getKeyDiv = (keycode) => {
    return(
    <div style={{padding:'3px', border: '1px inset grey', borderRadius:'5px', backgroundColor:'white', display: 'inline-block', fontSize:"15px", color:'black' }}>
        <div style={{backgroundColor:'lightgrey'}}>{keycode}</div>
    </div>
    );
}