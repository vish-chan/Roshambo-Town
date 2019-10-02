import React, { Component } from 'react';
import { VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, TILE_SIZE, SAVE_KEY, RESTORE_KEY, ESC_KEY, MAIN_MENU } from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdatePlayerPosition, InitiateConversation, UpdateConversation, PickupGameObject, ToggleInventory, RestoreState, CheckPortalAndEnter } from '../redux/ActionCreators';
import { mapToViewport, getKeyDiv } from '../helpers/funcs';
import CustomModal from './CustomModalComponent';

const mapStatetoProps = state => {
    return({
        player: state.player,
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

    return(
        <div id="player" style={playerStyle} />
    );
}

class Player extends Component {

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.toggleExitModalState = this.toggleExitModalState.bind(this);
        this.state = {
            showExitModal: false,
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    toggleExitModalState() {
        this.setState({
            showExitModal: !this.state.showExitModal,
        })
    }

    handleKeyDown(event) {
        if(this.props.player.isAnimating || this.props.player.frozen || this.props.player.inBattle)
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
            } else if(INVENTORY_KEY.includes(keyCode)) {
                this.props.toggleInventory();
            } else if(SAVE_KEY.includes(keyCode) && !this.props.player.interacting) {
                this.props.checkPortalAndEnter();
            }  else if(ESC_KEY.includes(keyCode)) {
                this.toggleExitModalState();
            }
        } 
    }

    
    render() {

        return(
            <div>
                <PlayerSprite player={this.props.player} viewport={this.props.viewport}/>
                <CustomModal show={this.state.showExitModal} confirmLink={MAIN_MENU} cancelLink={this.toggleExitModalState} />
            </div>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);