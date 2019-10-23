import React from 'react';
import { MAX_LEVEL, LEVEL_COLORS } from './constants';

export const getRounded = (num) => {
    return isNaN(num)? 0: Math.round(num);
}

let BASE_FONT_SIZE = 10;

export const getViewportDim = (screenWidth, screenHeight) => {
    const width = [960, 1200, 1440];
    const height = [640, 720, 800];
    let viewportdim = [];
    if(screenWidth < 1200) {
        viewportdim[0] = width[0];
        BASE_FONT_SIZE = 8;
    } else if(screenWidth < 1440) {
        viewportdim[0] = width[1];
        BASE_FONT_SIZE = 9;
    } else {
        viewportdim[0] = width[2];
        BASE_FONT_SIZE = 10;
    } 
    
    if(screenHeight < 720) {
        viewportdim[1] = height[0];
        BASE_FONT_SIZE = Math.min(BASE_FONT_SIZE, 8);
    } else if(screenHeight < 800) {
        viewportdim[1] = height[1];
        BASE_FONT_SIZE = Math.min(BASE_FONT_SIZE, 9);
    } else {
        viewportdim[1] = height[2];
        BASE_FONT_SIZE = Math.min(BASE_FONT_SIZE, 10);
    } 
    return viewportdim;
}

export const getFontSize = (multiplier = 1) => {
    return BASE_FONT_SIZE*multiplier;
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


export const getKeyDiv = (keycode, fontSize=getFontSize(1.5)) => {
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
