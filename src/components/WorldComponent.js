import React, {Component} from 'react';

class World extends Component {
    
    constructor(props) {
        super(props);

        this.width = 1000;
        this.height = 500;
        this.BGColor = "#228B22";
    }

    componentDidMount() {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.BGColor;
        ctx.fillRect(0,0,this.width,this.height);
    }

    render() {
        return(
            <div id="World">
                <canvas ref={(canvas) => this.canvas = canvas} width={this.width} height={this.height}/>
            </div>
        );
    }
}

export default World;