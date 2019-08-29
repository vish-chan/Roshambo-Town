import React, { Component } from 'react';
import {SPRITE_SIZE, ARROW_KEYCODES} from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdatePlayerPosition } from '../redux/ActionCreators';




const mapStatetoProps = state => {
    return({
        player: state.player,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        updatePlayerPosition: (keyCode) => { 
                                                if(!ARROW_KEYCODES.includes(keyCode))
                                                    return; 
                                                dispatch(UpdatePlayerPosition(keyCode)); 
                                            },
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
        event.preventDefault();
        var key = event.keyCode;
        this.props.updatePlayerPosition(key);
        event.stopImmediatePropagation();
    }

    
    render() {

        let playerStyle = {
            position: 'absolute',
            width: SPRITE_SIZE,
            height: SPRITE_SIZE, 
            backgroundImage: "url('./assets/images/player.png')",
            left: this.props.player.position[0],
            top: this.props.player.position[1],
            backgroundPosition: this.props.player.spriteLocation,
        };
        
        return(
            <div id="Player" style={playerStyle}>
            </div>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);