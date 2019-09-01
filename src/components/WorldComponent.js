import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import { AddMapAction, UpdateOriginAction  } from '../redux/ActionCreators';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../helpers/constants';
import { map } from '../data/maps/2/index';
import { connect } from 'react-redux';


const worldStyle = {
    position: 'relative',
    width:  VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    margin:  '20px auto',
    border: '10px solid white',
    overflow: 'hidden',
}

const mapStatetoProps = state => {
    return({
        map: state.map,
    });
}

const mapDispatchtoProps = dispatch => {
    return({
        loadMap: (map) => { dispatch(AddMapAction(map)); },
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