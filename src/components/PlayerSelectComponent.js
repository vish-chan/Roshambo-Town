import React, { Component } from 'react';
import {connect} from 'react-redux';
import { centerBgImg, solidBorder } from '../helpers/funcs';
import { SetPlayerInfoAction, StartNewJourneyAction } from '../redux/ActionCreators';

const SELECT_URL = "/assets/images/80/objectsAndProps/playerselect/"
const BG_MAIN = 'lightgrey';
const NAME_MIN = 3, NAME_MAX = 15;

const style = {

    position: 'relative',
    margin: '60px auto',
    border: '10px solid white',
    overflow: 'hidden',
    backgroundColor: BG_MAIN,
    display: 'flex',
    flexDirection: 'column',
    
    alignItems: 'center',
    fontFamily: 'pixel',
    fontSize: '30px'
}

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
            this.props.startNewJourney();
            this.props.initPlayerInfo(this.state);
            this.props.startJourney();

        }
    }

    render() {
        return(
            <div style={{...style, width: this.props.width, height: this.props.height}}>
                <button onClick={this.props.handleBack} style={{position:'absolute', left:10, top:10, padding:'5px', backgroundColor:'whitesmoke', ...solidBorder(2, 'white', 5)}}><i className="fa fa-arrow-left fa-2x"></i></button>
                <div style={{margin:'20px'}}>Select Your Avatar</div>
                <div style={{width:'70%', height:'50%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center',}}>
                    <CharacterPane option="player_1" click={this.handleCharacterClick} selected={this.state.character} />
                    <CharacterPane option="player_2" click={this.handleCharacterClick} selected={this.state.character} />
                </div>
                <div style={{width:'60%', height: '20px' ,display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <label htmlFor = "player" style={{fontSize:'20px'}}> Avatar name </label> 
                    <div style={{width:'70%', fontFamily:'pixel',}}>
                        <input onChange={this.handleNameChange} type = "text" name = "player" id = "player" style={{width:'100%', fontFamily:'pixel' ,fontSize:'20px'}} value={this.state.name}/>
                        <div style={{width:'100%', fontSize:'10px', color:'grey'}}>{NAME_MIN} to {NAME_MAX} english alphabet characters</div>
                    </div>
                </div>
                <button onClick={this.validateAndSend} style={{fontFamily:'pixel',fontSize:'25px', margin:'50px'}}>Start Journey</button>
                <p style={{color:'red', fontSize:'20px'}}>{this.state.errmsg}</p>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(PlayerSelect);