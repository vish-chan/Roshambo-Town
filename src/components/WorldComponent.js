import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import { AddMap, LoadGameFromDisk, InitViewportAction  } from '../redux/ActionCreators';
import { level } from '../data/Levels/1/index';
import { connect } from 'react-redux';
import ConversationDisplay from './ConversationDisplayComponent';
import Inventory from './InventoryComponent';
import Loading from './LoadingComponent';
import Battle from './BattleComponent';
import Stats from './StatsComponent';


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
        loadGameFromDisk: () => { dispatch(LoadGameFromDisk()); },
        initViewport: (dims) => { dispatch(InitViewportAction(dims)); },
    });
}

class World extends Component {

    componentDidMount() {
        this.props.initViewport([this.props.width, this.props.height]);
        if(!this.props.loadgame)
            this.props.loadMap(level);
        else {
            this.props.loadGameFromDisk()
        }
    }

    
    render() {
        
        const worldStyle = {
            position: 'relative',
            margin:  'auto',
            width: this.props.width,
            height: this.props.height,
            border: '10px solid white',
            overflow: 'hidden',
            backgroundColor: 'black',
        }

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
                    <Stats width={this.props.width} />
                    <div id="world" style={worldStyle}>
                        <Map map={this.props.map} viewport={this.props.viewport}/>
                        <Player viewport={this.props.viewport} handleBack={this.props.handleBack}/>
                        <ConversationDisplay />
                        <Inventory />
                    </div>
                    <img src="assets/images/80/objectsAndProps/loading.png" alt="Loading" style={{display:'none'}}></img>
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(World);