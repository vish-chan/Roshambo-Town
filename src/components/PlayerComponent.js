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


const getKeyDiv = (keycode) => {
    return(
    <div style={{padding:'3px', border: '1px inset grey', borderRadius:'5px', backgroundColor:'white', display: 'inline-block', fontSize:"15px" }}>
        <div style={{backgroundColor:'lightgrey'}}>{keycode}</div>
    </div>
    );
}


const AwareComponent = (props) => {

    const position = mapToViewport(props.player.position, props.viewport.start);
    const style = {
        position: 'absolute',
        width: 160,
        left: isNaN(position[0] +  TILE_SIZE/2 - 80)? 0: position[0] + TILE_SIZE/2 - 80,
        top: position[1] - 40,
        fontFamily: 'gameboy',
        overflowWrap: 'break-word',
        zIndex: 2,
        fontSize:"15px",
        display: !props.player.interacting? "inline-block" : "none",
    };

    let instruction = props.player.nearbyNPC!==null? <div>Use {getKeyDiv("SPACE")} to talk</div> : null;
    instruction = props.player.nearbyGameObj!==null? <div>Use {getKeyDiv("P")} to pickup</div> : instruction;
    instruction = props.player.nearbyPortal!==null? <div>Use {getKeyDiv("E")} to enter</div> : instruction;

    return(
        <div style={style}>
            {instruction}
        </div>
    );

    
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
    

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
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
            <div>
                <PlayerSprite player={this.props.player} viewport={this.props.viewport}/>
                <AwareComponent player={this.props.player} viewport={this.props.viewport} />
            </div>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Player);