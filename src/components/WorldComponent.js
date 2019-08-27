import React, {Component} from 'react';

class World extends Component {
    
    constructor(props) {
        super(props);
        this.X = 1000;
        this.Y = 500;
        this.BGColor = "#228B22";
    }

    componentDidMount() {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.BGColor;
        ctx.fillRect(0,0,this.X,this.Y);
    }

    render() {
        return(
            <div id="World">
                <canvas ref={(canvas) => this.canvas = canvas} width={this.X} height={this.Y}/>
            </div>
        );
    }
}

export default World;