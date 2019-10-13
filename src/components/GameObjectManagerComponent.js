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

    
const GameObject = (props) => {
    const objStyle = {
        position: 'absolute',
        width: props.self.type.width,
        height: props.self.type.height, 
        backgroundImage: `url('${props.self.type.src}')`,
        left: props.self.position[0] + (TILE_SIZE/2 - props.self.type.width/2),
        top: props.self.position[1] + (TILE_SIZE/2 - props.self.type.height/2),
        backgroundPosition: `${props.self.type.srcpos[0]}px ${props.self.type.srcpos[1]}px`,
        backgroundSize: 'contain',
        transform: `rotate(${props.self.rotate}deg)`
    }

    return(
        <div id={`GObj${props.self.id}`} className={props.self.type.effects} style={objStyle}/>
    ); 
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