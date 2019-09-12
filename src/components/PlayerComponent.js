import React, { Component } from 'react';
import { VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, TILE_SIZE, SAVE_KEY, RESTORE_KEY } from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdatePlayerPosition, InitiateConversation, UpdateConversation, PickupGameObject, ToggleInventory, RestoreState, CheckPortalAndEnter } from '../redux/ActionCreators';
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
        pickupObject: () => { dispatch(PickupGameObject()); },
        toggleInventory: () => { dispatch(ToggleInventory()); },
        checkPortalAndEnter: () => { dispatch(CheckPortalAndEnter()); },
        restoreState: () => { dispatch(RestoreState()); },
    });
}



const PlayerSprite = (props) => {
    
    const position = mapToViewport(props.player.position, props.viewport.start);
    const playerStyle = {
        position: 'absolute',
        width: props.player.skin.width,
        height: props.player.skin.height, 
        backgroundImage: `url('${props.player.skin.src}')`,
        left: isNaN(position[0] + TILE_SIZE/2 - props.player.skin.width/2) ? 0: position[0] + (TILE_SIZE/2 - props.player.skin.width/2),
        top: isNaN(position[1] + TILE_SIZE/2 - props.player.skin.height/2) ? 0: position[1] + (TILE_SIZE/2 - props.player.skin.height/2),
        backgroundPosition: `${props.player.walkIndex * props.player.skin.width}px ${props.player.spriteLocation * props.player.skin.height}px`,
        zIndex: 2,
    };

    return(
        <div id="player" style={playerStyle} />
    );
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
        if(this.props.player.isAnimating || this.props.player.frozen)
            return;
        var keyCode = event.keyCode;
        console.log(keyCode);
        if(VALID_KEYCODES.includes(keyCode)) {
            console.log(keyCode);
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
            } else if(INVENTORY_KEY.includes(keyCode)) {
                this.props.toggleInventory();
            } else if(SAVE_KEY.includes(keyCode) && !this.props.player.interacting) {
                this.props.checkPortalAndEnter();
            } else if(RESTORE_KEY.includes(keyCode) && !this.props.player.interacting) {
                this.props.restoreState();
            }
        } 
    }

    
    render() {

        return(
            <PlayerSprite player={this.props.player} viewport={this.props.viewport}/>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);