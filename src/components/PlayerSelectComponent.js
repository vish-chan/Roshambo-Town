import React, { Component } from 'react';
import {connect} from 'react-redux';
import { centerBgImg, solidBorder, playSoundEffect } from '../helpers/funcs';
import { SetPlayerInfoAction, StartNewJourneyAction } from '../redux/ActionCreators';
import { BEEP_3_SOUND, PROPS_PATH } from '../helpers/constants';

const SELECT_URL = `${PROPS_PATH}/playerselect/`;
const NAME_MIN = 3, NAME_MAX = 15;


const mapDispatchToProps = dispatch => {
    return({
        initPlayerInfo: ({name, character}) => { dispatch(SetPlayerInfoAction(name, character)) },
        startNewJourney: () => { dispatch(StartNewJourneyAction()); },
    });
}

const checkName = (name) => {
    var pattern = /^[a-z]{3,15}$/i;
    return pattern.test(name);
}

const CharacterPane = (props) => {
    return(
        <div style={{width:220, height:300}} onClick={function(){ props.click(props.option);}} >
            <button className={props.option===props.selected?"selected":""}  style={{width:'100%', height:'100%', ...centerBgImg(`${SELECT_URL}${props.option}.png`, props.bgColor, 'crop')}}></button>
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
        playSoundEffect(BEEP_3_SOUND);
        this.setState({
            name: event.target.value,
            errmsg:""
        })
    }

    handleCharacterClick(option) {
        playSoundEffect(BEEP_3_SOUND);
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
            this.props.startNewJourney();
            this.props.initPlayerInfo(this.state);
            this.props.startJourney();

        }
    }

    render() {

        const style = {
            position: 'absolute',
            left: '50%',
            marginTop: 10,
            transform: 'translate(-50%, 0%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'pixel',
            fontSize: '30px'
        }

        return(
            <div className="animateTitle" style={{...style, width: '90%', height: '80%'}}>
                <button onClick= {this.props.handleBack} style={{position:'absolute', left: -50, top: -5, padding:'5px', backgroundColor: '#FD974F', ...solidBorder(1, '#57ABB3', 5)}}><i className="fa fa-arrow-left fa-2x"></i></button>
                <div style={{margin:'20px', padding:'10px', color:'black', backgroundColor:'#FD974F', borderTop:'2px #57ABB3 solid', borderBottom:'2px #57ABB3 solid'}}>Select Your Avatar</div>
                <div style={{width:'80%', height:'60%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center',}}>
                    <CharacterPane option="player_1" click={this.handleCharacterClick} selected={this.state.character} bgColor='#FFE0C9'/>
                    <CharacterPane option="player_2" click={this.handleCharacterClick} selected={this.state.character} bgColor='#B0F8FF'/>
                </div>
                <div style={{width:'90%', height: '50px' , margin:'10px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <label htmlFor = "player" style={{marginRight:'20px', fontSize:'20px', color:'black'}}> Avatar name </label> 
                    <div style={{width:'60%', fontFamily:'pixel',}}>
                        <input onChange={this.handleNameChange} type = "text" name = "player" id = "player" style={{width:'100%', fontFamily:'pixel' ,fontSize:'20px', color:'#57ABB3'}} value={this.state.name}/>
                        <div style={{width:'100%', fontSize:'10px', color:'grey'}}>{NAME_MIN} to {NAME_MAX} english alphabet characters</div>
                    </div>
                </div>
                <button onClick={this.validateAndSend} style={{width:350, fontFamily:'pixel',fontSize:'25px', margin:'50px', padding:'10px' ,backgroundColor: '#FD974F', ...solidBorder(2, '#57ABB3', 5),}}>Start Journey</button>
                <p style={{color:'red', fontSize:'20px'}}>{this.state.errmsg}</p>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(PlayerSelect);