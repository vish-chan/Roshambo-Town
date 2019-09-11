import React, { Component } from 'react';
import { VALID_KEYCODES, ARROW_KEYCODES, SPACE_KEY, PICKUP_KEY, INVENTORY_KEY, TILE_SIZE } from '../helpers/constants';
import { connect } from 'react-redux';
import { UpdatePlayerPosition, InitiateConversation, UpdateConversation, PickupGameObject } from '../redux/ActionCreators';
import { mapToViewport } from '../helpers/funcs';
import Inventory from './InventoryComponent';


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

        this.state = {
            isInventoryOpen: false,
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.toggleInventory = this.toggleInventory.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    toggleInventory() {
        this.setState({
            isInventoryOpen: !this.state.isInventoryOpen,
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
            } else if(INVENTORY_KEY.includes(keyCode)) {
                this.toggleInventory();
            }
        } 
    }

    
    render() {

        return(
            <React.Fragment>
                <PlayerSprite player={this.props.player} viewport={this.props.viewport}/>
                <Inventory isOpen={this.state.isInventoryOpen} items={this.props.player.inventory} playername={this.props.player.name}/>
            </React.Fragment>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);