import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import ConversationDisplay from './ConversationDisplayComponent';
import Inventory from './InventoryComponent';
import { UpdatePlayerPosition, PickupGameObject, ToggleInventory, HandleConversation } from '../redux/ActionCreators';
import { VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, ESC_KEY, BEEP_3_SOUND } from '../helpers/constants';
import CustomModal from './CustomModalComponent';
import { playSoundEffect } from '../helpers/funcs';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return({
        updatePlayerPosition: (keyCode) => { dispatch(UpdatePlayerPosition(keyCode)); },
        handleConversation: () => { dispatch(HandleConversation()); },
        pickupObject: () => { dispatch(PickupGameObject()); },
        toggleInventory: () => { dispatch(ToggleInventory()); },
    });
}

class World extends Component {


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
        playSoundEffect(BEEP_3_SOUND);
        this.setState({
            showExitModal: !this.state.showExitModal,
        })
    }

    handleKeyDown(event) {
        var keyCode = event.keyCode;
        console.log(keyCode);
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
                    <CustomModal show={this.state.showExitModal} confirmLink={this.props.handleBack} cancelLink={this.toggleExitModalState} />
            </div>
        );
        }
    }


export default connect(null, mapDispatchToProps)(World);