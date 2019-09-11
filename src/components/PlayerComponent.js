import React, { Component } from 'react';
import {PLAYER_SPRITE_SIZE, VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, INVENTORY_KEY} from '../helpers/constants';
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


 

const Inventory = (props) => {
    const inventoryStyle = {
        position: 'absolute',
        width: VIEWPORT_WIDTH-100,
        height: VIEWPORT_HEIGHT-100, 
        backgroundColor: 'black',
        color: 'white',
        fontSize: "10px",
        left:50,
        top:50,
        zIndex: 5,
        display: props.isOpen? 'block' : 'none',
    }

    return(<div id="inventory" style={inventoryStyle}>HELLO WORLD</div>);
}

    


class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.toggleInventory = this.toggleInventory.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    toggleInventory() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
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
            } else if(INVENTORY_KEY.includes(keyCode) && !this.props.player.interacting) {
                this.toggleInventory();
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
            zIndex: 2,
        }

        return(
            <React.Fragment>
                <div id="Player" style={playerStyle} />
                <Inventory isOpen={this.state.isOpen} items={this.props.player.Inventory}/>
            </React.Fragment>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);