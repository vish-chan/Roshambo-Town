import React, {Component} from 'react';
import Player from './PlayerComponent';
import Map from './MapComponent';
import { AddMap  } from '../redux/ActionCreators';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../helpers/constants';
import { map } from '../data/maps/2/index';
import { connect } from 'react-redux';
import ConversationDisplay from './ConversationDisplayComponent';


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
        viewport: state.viewport,
    });
}

const mapDispatchtoProps = dispatch => {
    return({
        loadMap: (map) => { dispatch(AddMap(map)); },
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
                <Map map={this.props.map} viewport={this.props.viewport}/>
                <Player/>
                <ConversationDisplay/>
            </div> 
        );
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(World);