import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import { AddMapAction } from '../redux/ActionCreators';
import { MAP_WIDTH, MAP_HEIGHT } from '../helpers/constants';
import { map } from '../data/maps/1/index';
import { connect } from 'react-redux';


const worldStyle = {
    position: 'relative',
    width:  MAP_WIDTH,
    height: MAP_HEIGHT,
    margin:  '20px auto',
    border: '10px solid white',
}

const mapStatetoProps = state => {
    return({
        map: state.map,
    });
}

const mapDispatchtoProps = dispatch => {
    return({
        loadMap: (map) => { dispatch(AddMapAction(map)); }
    });
}

class World extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadMap(map);
    }

    
    render() {
        
        return(
            <div style={worldStyle}>
                <Map map={this.props.map}/>
                <Player/>
            </div> 
        );
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(World);