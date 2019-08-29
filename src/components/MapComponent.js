import React, { Component } from 'react';
import { MAP_WIDTH, MAP_HEIGHT, SPRITE_SIZE, TREESPRITE, ROCKSPRITE, TREASURESPRITE } from '../helpers/constants';
import objectsImg from '../assets/images/objects.png';


const mapStyle = {
    width:  MAP_WIDTH,
    height: MAP_HEIGHT,
    backgroundColor: 'lawngreen',
}


class Map extends Component {

    renderTiles() {
        const tiles = this.props.map.tiles;
        const ctx = this.canvas.getContext("2d");
        const objectsSprite = new Image();
        objectsSprite.src = objectsImg;
        objectsSprite.onload = renderTiles;

        function renderTiles(){
            for(var i=0; i<tiles.length; i++) {
                for(var j=0; j<tiles[0].length; j++) {
                    if(tiles[i][j]===1)
                        ctx.drawImage(objectsSprite, TREESPRITE[0], TREESPRITE[1], SPRITE_SIZE, SPRITE_SIZE, j*SPRITE_SIZE, i*SPRITE_SIZE,  SPRITE_SIZE, SPRITE_SIZE);
                    else  if(tiles[i][j]===2)
                        ctx.drawImage(objectsSprite, ROCKSPRITE[0], ROCKSPRITE[1], SPRITE_SIZE, SPRITE_SIZE, j*SPRITE_SIZE, i*SPRITE_SIZE,  SPRITE_SIZE, SPRITE_SIZE);
                }
            }
        }
    }

    componentDidMount() {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = mapStyle.backgroundColor;
        ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        this.renderTiles();
    }

    componentDidUpdate() {
        this.renderTiles();
    }

   

    render(){
        return(
            <canvas ref={canvas => this.canvas = canvas} width={mapStyle.width} height={mapStyle.height}/>
        );
    }
}

export default Map;