import React, { Component } from 'react';
import {PLAYER_SPRITE_SIZE, ARROW_KEYCODES} from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdatePlayerPosition } from '../redux/ActionCreators';


const mapStatetoProps = state => {
    return({
        player: state.player,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        updatePlayerPosition: (keyCode) => { dispatch(UpdatePlayerPosition(keyCode));},
    });
}

class Player extends Component {

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if(this.props.player.isAnimating)
            return;
        var keyCode = event.keyCode;
        if(!ARROW_KEYCODES.includes(keyCode))
            return; 
        event.preventDefault();
        this.props.updatePlayerPosition(keyCode);
        event.stopImmediatePropagation();
    }

    
    render() {

        let playerStyle = {
            position: 'absolute',
            width: PLAYER_SPRITE_SIZE,
            height: PLAYER_SPRITE_SIZE, 
            backgroundImage: "url('./assets/images/player.png')",
            left: this.props.player.position[0],
            top: this.props.player.position[1],
            backgroundPosition: `${this.props.player.walkIndex * PLAYER_SPRITE_SIZE}px ${this.props.player.spriteLocation * PLAYER_SPRITE_SIZE}px`,
        };
        
        return(
            <div id="Player" style={playerStyle}>
            </div>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);