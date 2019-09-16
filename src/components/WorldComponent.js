import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import { AddMap  } from '../redux/ActionCreators';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../helpers/constants';
import { level } from '../data/maps/Levels/2/index';
import { connect } from 'react-redux';
import ConversationDisplay from './ConversationDisplayComponent';
import Inventory from './InventoryComponent';
import Loading from './LoadingComponent';
import Battle from './BattleComponent';


const worldStyle = {
    position: 'relative',
    width:  VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    margin:  '20px auto',
    border: '10px solid white',
    overflow: 'hidden',
    backgroundColor: 'white',
}

const mapStatetoProps = state => {
    return({
        map: state.map,
        viewport: state.viewport,
        battle: state.battle,
    });
}

const mapDispatchtoProps = dispatch => {
    return({
        loadMap: (level) => { dispatch(AddMap(level)); },
    });
}

class World extends Component {

    componentDidMount() {
        this.props.loadMap(level);
    }

    
    render() {
        if(this.props.map.isLoading) {
            return(
                <div style={worldStyle}>
                    <Loading />
                </div>
        );
        } else if(this.props.battle.isOpen) {
            return(
                <div style={worldStyle}>
                    <Battle />
                </div> 
            );
        } 
        else {
            return(
                <div style={worldStyle}>
                    <Map map={this.props.map} viewport={this.props.viewport}/>
                    <Player/>
                    <ConversationDisplay/>
                    <Inventory />
                </div> 
            );
        }
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(World);