import React, { Component } from 'react';
import NPCManager from './NPCManagerComponent';
import GameObjectManager from './GameObjectManagerComponent';
import ReactHowler  from 'react-howler';



class Map extends Component {

    render(){
        return(
            <div id="map" ref={map => this.map = map} style={{width: this.props.map.width,
                        height: this.props.map.height, 
                        left: `${this.props.viewport.start[0]}px`,
                        top: `${this.props.viewport.start[1]}px`,
                        position: "absolute",
                        backgroundImage: `url('${this.props.map.src}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'black', }}>
                <GameObjectManager />
                <NPCManager />
                <ReactHowler src={this.props.map.audioSrc} loop={true} volume={0.4} html5={false}/>
            </div>
        );
    }
}

export default Map;