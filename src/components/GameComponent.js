import React, {Component} from 'react';
import { AddMap, LoadGameFromDisk, InitViewportAction  } from '../redux/ActionCreators';
import { level } from '../data/Levels/1/index';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import Battle from './BattleComponent';
import Stats from './StatsComponent';
import World from './WorldComponent';

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

class Game extends Component {

    componentDidMount() {
        this.props.initViewport([this.props.width, this.props.height]);
        if(!this.props.loadgame)
            this.props.loadMap(level);
        else {
            this.props.loadGameFromDisk()
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

        if(this.props.map.isLoading) {
            return(
                <div id="game"  style={{...style, backgroundColor:'SlateGrey', marginTop:'60px'}}>
                    <Loading msg="Loading Map"/>
                </div>
            );
        } else if (this.props.statemanager.savingState) {
            return(
                <div id="game"  style={{...style, backgroundColor:'SlateGrey',marginTop:'60px'}}>
                    <Loading msg="Freezing state"/>
                </div>
            );
        } else if(this.props.battle.isOpen) {
            return(
                <div id="game"  style={{...style, marginTop:'60px'}}>
                    <Battle battle={this.props.battle} />
                </div> 
            );
        } 
        else {
            return(
                <React.Fragment>
                    <Stats width={this.props.width} />
                    <World width={this.props.width} height={this.props.height} map={this.props.map} viewport={this.props.viewport} handleBack={this.props.handleBack} />
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Game);