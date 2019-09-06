import React, { Component } from 'react';
import {PLAYER_SPRITE_SIZE} from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdateNPCListPosition } from '../redux/ActionCreators';


const mapStatetoProps = state => {
    return({
        npc: state.npc,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        updateNPCPosition: () => { dispatch(UpdateNPCListPosition());},
    });
}

const NPC = (props) => {

    const npcStyle = {
        position: 'absolute',
        width: PLAYER_SPRITE_SIZE,
        height: PLAYER_SPRITE_SIZE, 
        backgroundImage: `url('${props.self.skin}')`,
        left: props.self.position[0],
        top: props.self.position[1],
        backgroundPosition: `${props.self.walkIndex * PLAYER_SPRITE_SIZE}px ${props.self.spriteLocation * PLAYER_SPRITE_SIZE}px`,
    }

    return(
        <div id={`NPC${props.self.id}`} style={npcStyle}/>
    );    
}

class NPCManager extends Component {

    componentDidMount() {
        setInterval(this.props.updateNPCPosition.bind(this), 1500);
    }
    
    render() {
        const NPCObj = this.props.npc.map( npc => <NPC self={npc}  key={npc.id}/> );

        return(
            <ul id="NPCList">
                {NPCObj}
            </ul>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(NPCManager);