import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpdateNPCPosition } from '../redux/ActionCreators';
import { TILE_SIZE } from '../helpers/constants';
import { customSetInterval, intervalList } from '../helpers/funcs';


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
            backgroundImage: `url('${this.props.self.skin.src}')`,
            left: this.props.self.position[0] + ((TILE_SIZE/2) - (this.props.self.skin.width/2)),
            top: this.props.self.position[1] + ((TILE_SIZE/2) - (this.props.self.skin.height/2)),
            backgroundPosition: `${this.props.self.walkIndex * this.props.self.skin.width}px ${this.props.self.spriteLocation * this.props.self.skin.height}px`,
        }
    
        return(
            <div id={`NPC${this.props.self.id}`} style={npcStyle}/>
        ); 
    }  
}    

class NPCManager extends Component {
    
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