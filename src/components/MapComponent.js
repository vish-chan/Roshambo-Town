import React, { Component } from 'react';
import {TILE_SIZE, TREESPRITE, ROCKSPRITE } from '../helpers/constants';
import { objectsImg } from '../helpers/constants';

class Map extends Component {

    constructor(props) {
        super(props);
        this.onScreenCtx = null;
        this.offScreenCanvas = null;
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
                        ctx.drawImage(objectsSprite, TREESPRITE[0], TREESPRITE[1], TILE_SIZE, TILE_SIZE, j*TILE_SIZE, i*TILE_SIZE,  TILE_SIZE, TILE_SIZE);
                    else  if(tiles[i][j]===2)
                        ctx.drawImage(objectsSprite, ROCKSPRITE[0], ROCKSPRITE[1], TILE_SIZE, TILE_SIZE, j*TILE_SIZE, i*TILE_SIZE,  TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }

    componentDidMount() {
        this.onScreenCtx = this.canvas.getContext("2d");
    }

    componentDidUpdate() {
        if(this.offScreenCanvas==null) {
            this.offScreenCanvas = new OffscreenCanvas(this.props.map.width, this.props.map.height);
            const offscreenctx = this.offScreenCanvas.getContext("2d");
            offscreenctx.fillStyle = '#02DA88';
            offscreenctx.fillRect(0, 0, this.props.map.width, this.props.map.height);
            this.renderTiles(offscreenctx);
        }
        this.onScreenCtx.clearRect(0, 0, this.props.map.width, this.props.map.height);
        this.onScreenCtx.drawImage(this.offScreenCanvas, 0, 0);
    }
   

    render(){
        return(
            <div style={{width: this.props.map.width,
                        height: this.props.map.height, 
                        left: `${this.props.viewport.start[0]}px`,
                        top: `${this.props.viewport.start[1]}px`,
                        position: "absolute",
                       }}>
                <canvas ref={canvas => this.canvas = canvas} width={this.props.map.width} height={this.props.map.height}/>
            </div>
        );
    }
}

export default Map;