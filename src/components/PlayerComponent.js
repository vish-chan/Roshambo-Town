import React, { Component } from 'react';
import { VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, TILE_SIZE, SAVE_KEY, ESC_KEY, BEEP_3_SOUND } from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdatePlayerPosition, InitiateConversation, UpdateConversation, PickupGameObject, ToggleInventory, CheckPortalAndEnter } from '../redux/ActionCreators';
import { mapToViewport, playSoundEffect, getLevelColor } from '../helpers/funcs';
import CustomModal from './CustomModalComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

    const playermarkerstyle = {
        position: 'absolute',
        width: 25,
        height: 25, 
        left: position[0],
        top:  position[1],
        transform: 'translate(100%, -60%)',
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
        playSoundEffect(BEEP_3_SOUND)
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
                <CustomModal show={this.state.showExitModal} confirmLink={this.props.handleBack} cancelLink={this.toggleExitModalState} />
            </div>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);