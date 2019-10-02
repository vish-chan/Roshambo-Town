import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import { AddMap, LoadGameFromDisk  } from '../redux/ActionCreators';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../helpers/constants';
import { level } from '../data/maps/Levels/1/index';
import { connect } from 'react-redux';
import ConversationDisplay from './ConversationDisplayComponent';
import Inventory from './InventoryComponent';
import Loading from './LoadingComponent';
import Battle from './BattleComponent';
import Stats from './StatsComponent';


const worldStyle = {
    position: 'relative',
    width:  VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    margin:  'auto',
    border: '10px solid white',
    overflow: 'hidden',
    backgroundColor: 'white',
}

const mapStatetoProps = state => {
    return({
        map: state.map,
        viewport: state.viewport,
        battle: state.battle,
        statemanager: state.statemanager,
    });
}

const mapDispatchtoProps = dispatch => {
    return({
        loadMap: (level) => { dispatch(AddMap(level)); },
        loadGameFromDisk: () => { dispatch(LoadGameFromDisk()); }
    });
}

class World extends Component {

    componentDidMount() {
        if(!this.props.loadgame)
            this.props.loadMap(level);
        else {
            this.props.loadGameFromDisk()
        }
    }

    
    render() {
        if(this.props.map.isLoading) {
            return(
                <div id="world"  style={{...worldStyle, marginTop:'60px'}}>
                    <Loading msg="Loading Map"/>
                </div>
            );
        } else if (this.props.statemanager.savingState) {
            return(
                <div id="world"  style={{...worldStyle, marginTop:'60px'}}>
                    <Loading msg="Freezing state"/>
                </div>
            );
        } else if(this.props.battle.isOpen) {
            return(
                <div id="world"  style={{...worldStyle, marginTop:'60px'}}>
                    <Battle battle={this.props.battle} />
                </div> 
            );
        } 
        else {
            return(
                <React.Fragment>
                    <Stats />
                    <div id="world" style={worldStyle}>
                        <Map map={this.props.map} viewport={this.props.viewport}/>
                        <Player viewport={this.props.viewport}/>
                        <ConversationDisplay />
                        <Inventory />
                    </div> 
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(World);