import React, { Component } from 'react';
import { TILE_SIZE } from '../helpers/constants';
import { connect } from 'react-redux';
import { mapToViewport, getLevelColor } from '../helpers/funcs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const mapStatetoProps = state => {
    return({
        player: state.player,
    });
}

const PlayerSprite = (props) => {
    
    const position = mapToViewport(props.player.position, props.viewport.start);
    const playerStyle = {
        position: 'absolute',
        width: props.player.skin.width,
        height: props.player.skin.height, 
        backgroundImage: `url('${props.player.skin.src}/sprite.png')`,
        left: isNaN(position[0] + TILE_SIZE/2 - props.player.skin.width/2) ? 0: position[0] + (TILE_SIZE/2 - props.player.skin.width/2),
        top: isNaN(position[1] + TILE_SIZE/2 - props.player.skin.height/2) ? 0: position[1] + (TILE_SIZE/2 - props.player.skin.height/2),
        backgroundPosition: `${props.player.walkIndex * props.player.skin.width}px ${props.player.spriteLocation * props.player.skin.height}px`,
        zIndex: 2,
    };

    const playermarkerstyle = {
        position: 'absolute',
        width: 25,
        height: 25, 
        left: position[0],
        top:  position[1],
        transform: 'translate(110%, -60%)',
        display: !props.player.interacting? 'block': 'none',
    }

    return(
        <div>
            <div id="player" style={playerStyle} />
            <div style={playermarkerstyle}>
                <FontAwesomeIcon className="wind" style={{color:getLevelColor(props.player.battle.level), position:'absolute', left:'50%', top:'50%'}} icon={faCaretDown} size="2x"/>
            </div>
        </div>
       
    );
}

class Player extends Component {

    
    render() {

        return(
            <PlayerSprite player={this.props.player} viewport={this.props.viewport}/>
        );
    }
}

export default connect(mapStatetoProps)(Player);