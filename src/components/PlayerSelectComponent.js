import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, NEWGAME, WORLD_BASE } from '../helpers/constants';
import { centerBgImg } from '../helpers/funcs';
import { SetPlayerInfoAction } from '../redux/ActionCreators';

const SELECT_URL = "/assets/images/80/objectsAndProps/playerselect/"
const BG_MAIN = 'lightgrey';
const NAME_MIN = 3, NAME_MAX = 15;

const style = {

    position: 'relative',
    margin: '60px auto',
    width:  VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    border: '10px solid white',
    overflow: 'hidden',
    backgroundColor: BG_MAIN,
    display: 'flex',
    flexDirection: 'column',
    
    alignItems: 'center',
    fontFamily: 'gameboy',
    fontSize: '30px'
}

const mapDispatchToProps = dispatch => {
    return({
        initPlayerInfo: ({name, character}) => { dispatch(SetPlayerInfoAction(name, character)) },
    });
}

const checkName = (name) => {
    var pattern = /^[a-z]{3,15}$/i;
    return pattern.test(name);
}

const CharacterPane = (props) => {
    return(
        <div onClick={() => props.click(props.option)}>
            <button className={props.option===props.selected?"selected":""} style={{width:'220px', height:'300px',...centerBgImg(`${SELECT_URL}${props.option}.png`)}}></button>
        </div>
    );
}

class PlayerSelect extends Component {

    constructor(props) {
        super(props);
        this.handleCharacterClick = this.handleCharacterClick.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.validateAndSend = this.validateAndSend.bind(this);
        this.state = {
            character: null,
            name: "",
            errmsg:""
        }
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
            errmsg:""
        })
    }

    handleCharacterClick(option) {
        this.setState({
            character: option,
            errmsg:""
        });
    }

    validateAndSend() {
        if(this.state.character===null) {
            this.setState(
                { errmsg: "Please select an avatar!", }
            );
            return;
        } else if(!checkName(this.state.name)) {
            this.setState(
                { errmsg: `Invalid Name!`,}
            );
            return;
        } else {
            this.props.initPlayerInfo(this.state);
        }
    }

    getLink(text, target) {
        if(this.state.character!==null && checkName(this.state.name)) {
            return(<Link to={target}>{text}</Link>);
        } else {
            return(<span>{text}</span>);
        }
    }

    render() {
        return(
            <div style={style}>
                <div style={{margin:'20px'}}>Select Your Avatar</div>
                <div style={{width:'70%', height:'50%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center',}}>
                    <CharacterPane option="player_1" click={this.handleCharacterClick} selected={this.state.character} />
                    <CharacterPane option="player_2" click={this.handleCharacterClick} selected={this.state.character} />
                </div>
                <div style={{width:'60%', height: '20px' ,display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <label htmlFor = "player" style={{fontSize:'20px'}}> Enter name </label> 
                    <div style={{width:'70%', fontFamily:'gameboy',}}>
                        <input onChange={this.handleNameChange} type = "text" name = "player" id = "player" style={{width:'100%', fontFamily:'gameboy' ,fontSize:'20px'}} value={this.state.name}/>
                        <div style={{width:'100%', fontSize:'10px', color:'grey'}}>{NAME_MIN} to {NAME_MAX} english alphabet characters</div>
                    </div>
                </div>
                <button onClick={this.validateAndSend} style={{fontFamily:'gameboy',fontSize:'25px', margin:'30px'}}>{this.getLink("Start Game", `${WORLD_BASE}/${NEWGAME}`)}</button>
                <p style={{color:'red', fontSize:'20px'}}>{this.state.errmsg}</p>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(PlayerSelect);