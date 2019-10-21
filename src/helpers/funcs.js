import React from 'react';
import { MAX_LEVEL, LEVEL_COLORS } from './constants';

export const getRounded = (num) => {
    return isNaN(num)? 0: Math.round(num);
}

export const getViewportDim = (screenWidth) => {
    const dims = [[1040, 480], [1120,640], [1440, 800]];
    if(screenWidth < 1400) 
        return dims[0];
    else if(screenWidth < 1680) 
        return dims[1];
    else 
        return dims[2];
    
}

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

export const centerBgImg = (image, color='white', size='contain') => {
    return({
        backgroundColor: color,
        backgroundImage: `url('${image}')`, 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition:'center',
        backgroundSize: size,
    });
}

export const solidBorder = (size, color, radius) => {
    return({
        border: `${size}px solid ${color}`,
        borderRadius: `${radius}px`,
    });
}


export const getKeyDiv = (keycode, fontSize=15) => {
    return(
    <div style={{padding:'3px', border: '1px inset grey', borderRadius:'5px', backgroundColor:'white', display: 'inline-block', fontSize:`${fontSize}px`, color:'#5d5f5b' }}>
        <div style={{backgroundColor:'lightgrey'}}>{keycode}</div>
    </div>
    );
}

export const getLevelColor = (level) => {
   if(level<1 || level>MAX_LEVEL) 
        return "white";
    return(LEVEL_COLORS[`L${level}`]);
}

export const getWinPercColor = (winperc) => {
    if(winperc < 25)
        return 'Red';
    else if(winperc < 50) 
        return 'Crimson';
    else if(winperc < 75)
        return 'SpringGreen';
    else 
        return 'ForestGreen'
 }

 export const playSoundEffect = (src) => {
     const click = new Audio(src);
     click.play();
 }

 export const preloadPictures = function(pictureUrls, callback) {
    let i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () {                               
                if (++loaded >= pictureUrls.length && callback) {
                    callback();
                }
            };
            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};
