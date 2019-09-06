import React, { Component } from 'react';
import {PLAYER_SPRITE_SIZE} from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdateNPCPosition } from '../redux/ActionCreators';


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
        setInterval(this.props.updateNPCPosition.bind(this), this.props.self.updateInterval);
    }

    componentWillUnmount() {
        clearInterval();
    }
    
    render() {
        const npcStyle = {
            position: 'absolute',
            width: PLAYER_SPRITE_SIZE,
            height: PLAYER_SPRITE_SIZE, 
            backgroundImage: `url('${this.props.self.skin.src}')`,
            left: this.props.self.position[0],
            top: this.props.self.position[1],
            backgroundPosition: `${this.props.self.walkIndex * PLAYER_SPRITE_SIZE}px ${this.props.self.spriteLocation * PLAYER_SPRITE_SIZE}px`,
        }
    
        return(
            <div id={`NPC${this.props.self.id}`} style={npcStyle}/>
        ); 
    }  
}    

class NPCManager extends Component {
    
    render() {
        const NPCObj = this.props.npc.map( npc => <NPC self={npc}  key={npc.id} updateNPCPosition={this.props.updateNPCPosition}/> );

        return(
            <ul id="NPCList">
                {NPCObj}
            </ul>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(NPCManager);