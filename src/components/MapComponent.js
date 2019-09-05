import React, { Component } from 'react';

class Map extends Component {

    constructor(props) {
        super(props);
    }

    drawCanvas() {
        const onscreenctx = this.canvas.getContext("2d");
        onscreenctx.clearRect(0, 0, this.props.map.width, this.props.map.height);
        onscreenctx.drawImage(this.props.map.canvas, 0, 0);
    }

    componentDidMount() {
        if(!this.props.map.isLoading) {
           this.drawCanvas();
        }
    }

    componentDidUpdate() {
        if(!this.props.map.isLoading) {
            this.drawCanvas();
        }
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