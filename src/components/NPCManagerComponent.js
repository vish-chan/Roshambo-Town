import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpdateNPCPosition } from '../redux/ActionCreators';
import { TILE_SIZE, NPC_BATTLE_MARKER } from '../helpers/constants';
import { customSetInterval, intervalList, clearIntervals, getLevelColor } from '../helpers/funcs';


const mapStatetoProps = state => {
    return({
        npc: state.npc,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        updateNPCPosition: function(){ dispatch(UpdateNPCPosition(this.props.self.id));},
    });
}

class NPC extends Component {

    componentDidMount() {
        customSetInterval(this.props.updateNPCPosition.bind(this), this.props.self.moveInterval, this.props.self.id);
    }

    componentDidUpdate() {
        if(!this.props.frozen) {
            if(!("_"+this.props.self.id in intervalList)) {
                customSetInterval(this.props.updateNPCPosition.bind(this), this.props.self.moveInterval, this.props.self.id);
            }
        }
    }
    
    render() {
        const npcStyle = {
            position: 'absolute',
            width: this.props.self.skin.width,
            height: this.props.self.skin.height, 
            backgroundImage: `url('${this.props.self.skin.src}/sprite.png')`,
            left: this.props.self.position[0] + ((TILE_SIZE/2) - (this.props.self.skin.width/2)),
            top: this.props.self.position[1] + ((TILE_SIZE/2) - (this.props.self.skin.height/2)),
            backgroundPosition: `${this.props.self.walkIndex * this.props.self.skin.width}px ${this.props.self.spriteLocation * this.props.self.skin.height}px`,
        }

        const battlemarkerstylebase = {
            position: 'absolute',
            width: 30,
            height: 30, 
            left: this.props.self.position[0] + ((TILE_SIZE/2) - (30/2)),
            top: (this.props.self.position[1] - 50) + ((TILE_SIZE/2) - (30/2)),
            display: this.props.self.battle && !this.props.self.battleFlag ? 'block':'none'
        }

        const battlemarkerstyleoverlay = {
            position: 'absolute',
            width: 30,
            height: 30, 
            backgroundImage: `url(${NPC_BATTLE_MARKER})`,
            backgroundSize: "contain",
        }
    
        return(
            <div>
                <div id={`NPC${this.props.self.id}`} style={npcStyle}/>
                <div className="blink" style={battlemarkerstylebase}>
                    <div style={{position:'absolute', width:30, height:30,backgroundColor:getLevelColor(this.props.self.level)}}></div>
                    <div style={battlemarkerstyleoverlay} />
                </div>
            </div> 
        ); 
    }  
}    

class NPCManager extends Component {

    componentWillUnmount() {
        clearIntervals();
    }
    
    render() {
        const NPCObj = this.props.npc.list.map( npc => <NPC self={npc}  key={npc.id} updateNPCPosition={this.props.updateNPCPosition} frozen={this.props.npc.frozen}/> );

        return(
            <ul id="NPCList">
                {NPCObj}
            </ul>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(NPCManager);