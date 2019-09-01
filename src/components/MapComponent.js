import React, { Component } from 'react';
import {SPRITE_SIZE, TREESPRITE, ROCKSPRITE } from '../helpers/constants';
import objectsImg from '../assets/images/objects.png';



const canvasStyle = {
    backgroundColor: 'lawngreen',
}


class Map extends Component {

    constructor(props) {
        super(props);
        this.ctx = null;
    }

    renderTiles(ctx) {
        const tiles = this.props.map.tiles;
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
        this.ctx = this.canvas.getContext("2d");
        this.ctx.clearRect(0, 0, this.props.map.width, this.props.map.height);
        this.renderTiles(this.ctx);
    }

    componentDidUpdate() {
        this.ctx.clearRect(0, 0, this.props.map.width, this.props.map.height);
        this.renderTiles(this.ctx);
    }
   

    render(){
        console.log("Render map");
        return(
            <div style={{width: this.props.map.width,
                        height: this.props.map.height, 
                        left: `${this.props.map.viewport.start[0]}px`,
                        top: `${this.props.map.viewport.start[1]}px`,
                        position: "absolute",
                       }}>
                <canvas ref={canvas => this.canvas = canvas} width={this.props.map.width} height={this.props.map.height}/>
            </div>
        );
    }
}

export default Map;