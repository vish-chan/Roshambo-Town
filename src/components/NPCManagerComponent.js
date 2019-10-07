import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faExclamation, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { UpdateNPCPosition } from '../redux/ActionCreators';
import { TILE_SIZE, GANG_MEMBER, NON_GANG_MEMBER, BOSS } from '../helpers/constants';
import { customSetInterval, intervalList, clearIntervals, getLevelColor, solidBorder } from '../helpers/funcs';


const mapStatetoProps = state => {
    return({
        npc: state.npc,
    });
}

const mapDispatchToProps = dispatch => {
    return({
        updateNPCPosition: function(){ dispatch(UpdateNPCPosition(this.props.self.id));},
    });
}

class NPC extends Component {


    constructor(props) {
        super(props);
        this.battlerMarkerIcon = null;
        if(this.props.self.battle) {
            if(this.props.self.battlerType===BOSS || this.props.self.battlerType===GANG_MEMBER)
                this.battlerMarkerIcon = faSkull;
            else if(this.props.self.battlerType===NON_GANG_MEMBER) 
                this.battlerMarkerIcon = faExclamation;
        }
    }

    componentDidMount() {
        customSetInterval(this.props.updateNPCPosition.bind(this), this.props.self.moveInterval, this.props.self.id);
    }

    componentDidUpdate() {
        if(!this.props.frozen) {
            if(!("_"+this.props.self.id in intervalList)) {
                customSetInterval(this.props.updateNPCPosition.bind(this), this.props.self.moveInterval, this.props.self.id);
            }
        }
    }
    
    render() {

        const npcStyle = {
            position: 'absolute',
            width: this.props.self.skin.width,
            height: this.props.self.skin.height, 
            backgroundImage: `url('${this.props.self.skin.src}/sprite.png')`,
            left: this.props.self.position[0] + ((TILE_SIZE/2) - (this.props.self.skin.width/2)),
            top: this.props.self.position[1] + ((TILE_SIZE/2) - (this.props.self.skin.height/2)),
            backgroundPosition: `${this.props.self.walkIndex * this.props.self.skin.width}px ${this.props.self.spriteLocation * this.props.self.skin.height}px`,
        }

        const battlemarkerstylebase = {
            position: 'absolute',
            width: 25,
            height: 25, 
            left: this.props.self.position[0],
            top: this.props.self.position[1],
            transform: 'translate(100%, -100%)',
            display: !this.props.self.interacting && this.props.self.battle && this.props.self.defeatedCount===0 ? 'block':'none',
        }

        const messagestylebase = {
            position: 'absolute',
            width: 25,
            height: 25, 
            left: this.props.self.position[0],
            top: this.props.self.position[1],
            transform: 'translate(100%, -70%)',
            display: !this.props.self.interacting && !this.props.self.talkFlag? 'block':'none',
        }
    
        return(
            <div>
                <div id={`NPC${this.props.self.id}`} style={npcStyle}/>
                <div className="blink" style={battlemarkerstylebase}>
                    <div style={{position:'relative', width:'100%', height:'100%', textAlign:'center',backgroundColor:getLevelColor(this.props.self.level), ...solidBorder(1,'black',5)}}><FontAwesomeIcon icon={this.battlerMarkerIcon}/></div>
                </div>
                <div className="blink" style={messagestylebase}>
                    <div style={{position:'relative', width:'100%', height:'100%', textAlign:'center'}}><FontAwesomeIcon style={{color:"white"}} size="lg" icon={faEnvelope }/></div>
                </div>
            </div> 
        ); 
    }  
}    

class NPCManager extends Component {

    componentWillUnmount() {
        clearIntervals();
    }
    
    render() {
        const NPCObj = this.props.npc.list.map( npc => <NPC self={npc}  key={npc.id} updateNPCPosition={this.props.updateNPCPosition} frozen={this.props.npc.frozen}/> );

        return(
            <ul id="NPCList">
                {NPCObj}
            </ul>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(NPCManager);