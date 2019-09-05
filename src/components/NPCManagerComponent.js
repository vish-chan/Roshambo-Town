import React, { Component } from 'react';
import {PLAYER_SPRITE_SIZE} from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdateNPCPosition } from '../redux/ActionCreators';
import { mapToViewport } from '../helpers/funcs';


const mapStatetoProps = state => {
    return({
        npc: state.npc,
        viewport: state.viewport,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        updateNPCPosition: (npcId) => { dispatch(UpdateNPCPosition(npcId));},
    });
}

class NPC extends Component {


    render() {
        let position = mapToViewport(this.props.self.position, this.props.viewport.start);
        let npcStyle = {
            position: 'absolute',
            width: PLAYER_SPRITE_SIZE,
            height: PLAYER_SPRITE_SIZE, 
            backgroundImage: `url('${this.props.self.skin}')`,
            left: position[0],
            top: position[1],
            backgroundPosition: `${this.props.self.walkIndex * PLAYER_SPRITE_SIZE}px ${this.props.self.spriteLocation * PLAYER_SPRITE_SIZE}px`,
        };
        
        return(
            <div id={`NPC${this.props.self.id}`}  style={npcStyle}>
            </div>
        );
    }
    
}

class NPCManager extends Component {
    
    render() {
        const NPCObj = this.props.npc.map( npc => <NPC self={npc} update={this.props.updateNPCPosition} viewport={this.props.viewport} />);

        return(
            <React.Fragment>
                {NPCObj}
            </React.Fragment>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(NPCManager);