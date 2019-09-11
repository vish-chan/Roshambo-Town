import React, { Component } from 'react';
import { TILE_SIZE } from '../helpers/constants';
import { connect } from 'react-redux';


const mapStatetoProps = state => {
    return({
        gameobjects: state.gameobjects,
    });
}

const mapDispatchToProps = dispatch => {
    return({

    });
}

class GameObject extends Component {
    
    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    render() {
        const objStyle = {
            position: 'absolute',
            width: this.props.self.type.width,
            height: this.props.self.type.height, 
            backgroundImage: `url('${this.props.self.type.src}')`,
            left: this.props.self.position[0] + (TILE_SIZE/2 - this.props.self.type.width/2),
            top: this.props.self.position[1] + (TILE_SIZE/2 - this.props.self.type.height/2),
            backgroundPosition: `0px 0px`,
        }
    
        return(
            <div id={`GObj${this.props.self.id}`} style={objStyle}/>
        ); 
    }  
}    

class GameObjectManager extends Component {
    
    render() {
        const GameObj = this.props.gameobjects.map( gameobject => <GameObject self={gameobject}  key={gameobject.id} /> );

        return(
            <ul id="GameObjList">
                {GameObj}
            </ul>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(GameObjectManager);