import React, { Component } from 'react';
import {PLAYER_SPRITE_SIZE, VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY} from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdatePlayerPosition, InitiateConversation, UpdateConversation, PickupGameObject } from '../redux/ActionCreators';
import { mapToViewport } from '../helpers/funcs';


const mapStatetoProps = state => {
    return({
        player: state.player,
        viewport: state.viewport,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        updatePlayerPosition: (keyCode) => { dispatch(UpdatePlayerPosition(keyCode)); },
        initiateConversation: () => { dispatch(InitiateConversation()); },
        updateConversation: () => { dispatch(UpdateConversation()); },
        pickupObject: () => { dispatch(PickupGameObject()); }
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
        //console.log(keyCode);
        if(VALID_KEYCODES.includes(keyCode)) {
            //console.log(keyCode);
            event.preventDefault();
            event.stopImmediatePropagation();
            if(ARROW_KEYCODES.includes(keyCode) && !this.props.player.interacting) {
                this.props.updatePlayerPosition(keyCode);
            } else if(SPACE_KEY.includes(keyCode)) {
                if(!this.props.player.interacting)
                    this.props.initiateConversation();
                else
                    this.props.updateConversation();
            } else if(PICKUP_KEY.includes(keyCode) && !this.props.player.interacting) {
                this.props.pickupObject();
            }
        } 
    }

    
    render() {
        
        const position = mapToViewport(this.props.player.position, this.props.viewport.start);
        const playerStyle = {
            position: 'absolute',
            width: PLAYER_SPRITE_SIZE,
            height: PLAYER_SPRITE_SIZE, 
            backgroundImage: `url('${this.props.player.skin.src}')`,
            left: position[0],
            top: position[1],
            backgroundPosition: `${this.props.player.walkIndex * PLAYER_SPRITE_SIZE}px ${this.props.player.spriteLocation * PLAYER_SPRITE_SIZE}px`,
        }

        return(
            <div id="Player" style={playerStyle}>
            </div>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);