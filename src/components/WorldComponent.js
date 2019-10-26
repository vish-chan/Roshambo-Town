import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import ConversationDisplay from './ConversationDisplayComponent';
import Inventory from './InventoryComponent';
import { UpdatePlayerPosition, PickupGameObject, ToggleInventory, HandleConversation, SetPlayerSpeedAction } from '../redux/ActionCreators';
import { VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, ESC_KEY, BEEP_3_SOUND, KEYCODES } from '../helpers/constants';
import CustomModal from './CustomModalComponent';
import { playSoundEffect } from '../helpers/funcs';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return({
        updatePlayerPosition: (keyCode) => { dispatch(UpdatePlayerPosition(keyCode)); },
        handleConversation: () => { dispatch(HandleConversation()); },
        handlePlayerSpeedChange: (speed) => { dispatch(SetPlayerSpeedAction(speed)); },
        pickupObject: () => { dispatch(PickupGameObject()); },
        toggleInventory: () => { dispatch(ToggleInventory()); },
    });
}

class World extends Component {


    constructor(props) {
        super(props);

        this.touchstartX = null;
        this.touchstartY = null;
        this.touchendX = null;
        this.touchendY = null;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.toggleExitModalState = this.toggleExitModalState.bind(this);
        this.state = {
            showExitModal: false,
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('touchstart', this.handleTouchStart, false);
        window.addEventListener('touchmove', this.handleTouchMove, false);
        window.addEventListener('touchend', this.handleTouchEnd, false);
    }
    

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);

    }

    toggleExitModalState() {
        playSoundEffect(BEEP_3_SOUND);
        this.setState({
            showExitModal: !this.state.showExitModal,
        })
    }


    handleTouchStart(event) {
        event.preventDefault();
        this.touchstartX = this.touchendX = event.touches[0].clientX;
        this.touchstartY = this.touchendY = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        event.preventDefault();
        this.touchendX = event.touches[0].clientX;
        this.touchendY = event.touches[0].clientY;
        var xDiff = this.touchendX - this.touchstartX, 
            yDiff = this.touchendY - this.touchstartY;
        if(Math.abs(xDiff) > Math.abs(yDiff)) {
            if(xDiff > 0) {
                this.props.updatePlayerPosition(KEYCODES.right);
            } else if(xDiff < 80) {
                this.props.updatePlayerPosition(KEYCODES.left);
            }
        } else {
            if(yDiff > 0) {
                this.props.updatePlayerPosition(KEYCODES.down);
            } else if(yDiff < 0) {
                this.props.updatePlayerPosition(KEYCODES.up);
            }
        }
    }

    handleTouchEnd() {
        var xDiff = Math.abs(this.touchendX - this.touchstartX), 
            yDiff = Math.abs(this.touchendY - this.touchstartY);
        if(xDiff===0 && yDiff===0)
            this.props.handleConversation();
    }

    handleKeyDown(event) {
        var keyCode = event.keyCode;
        //console.log(keyCode);
        if(VALID_KEYCODES.includes(keyCode)) {
            //console.log(keyCode);
            event.preventDefault();
            event.stopImmediatePropagation();
            if(ARROW_KEYCODES.includes(keyCode)) {
                this.props.updatePlayerPosition(keyCode);
            } else if(SPACE_KEY.includes(keyCode)) {
                this.props.handleConversation();
            } else if(PICKUP_KEY.includes(keyCode)) {
                this.props.pickupObject();
            } else if(INVENTORY_KEY.includes(keyCode)) {
                this.props.toggleInventory();
            } else if(ESC_KEY.includes(keyCode)) {
                this.toggleExitModalState();
            }
        } 
    }


    render() {
        
        const style = {
            position: 'relative',
            margin:  'auto',
            width: this.props.width,
            height: this.props.height,
            border: '10px solid white',
            overflow: 'hidden',
            backgroundColor: 'black',
        }

        return(
            <div ref={world => this.world = world} id="world" style={style}>
                    <Map map={this.props.map} viewport={this.props.viewport}/>
                    <Player viewport={this.props.viewport} />
                    <ConversationDisplay />
                    <Inventory />
                    <CustomModal show={this.state.showExitModal} speedChange={this.props.handlePlayerSpeedChange} confirmLink={this.props.handleBack} cancelLink={this.toggleExitModalState} />
            </div>
        );
        }
    }


export default connect(null, mapDispatchToProps)(World);