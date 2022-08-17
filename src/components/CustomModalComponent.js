import React, { Component } from 'react';
import { solidBorder, getFontSize } from '../helpers/funcs';
import { faWindowClose, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DEFAULT_FRAME_INTERVAL } from '../helpers/constants';

const bgStyle = (bgcolor, bordercolor) => {
    return({
        padding: '5px',
        backgroundColor: bgcolor,
        ...solidBorder(2, bordercolor, 5),
    });
}

class CustomModal extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            slider: 1,
        }

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSliderChange(event) {
        this.setState({
            slider: parseInt(event.target.value),
        });
        this.props.speedChange(DEFAULT_FRAME_INTERVAL - parseInt(event.target.value));
    }

    handleClose() {
        this.props.cancelLink();
    }

    render() {
        const style = {
            position: 'absolute',
            width: "60%",
            height: "40%",
            ...solidBorder(5, 'grey', 5), 
            left:'50%',
            top:'50%',
            transform: 'translate(-50%, -50%)',
            padding:10,
            zIndex: 5,
            backgroundColor:'whitesmoke',
            display: this.props.show? "flex": "none",
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            fontFamily: 'gameboy',
            fontSize: getFontSize(2.5),
        };
    
        return(
            <div style={style}>
                <div style={{width:"100%",display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <label style={{fontSize: getFontSize(2.5)}} htmlFor="inputspeed">Player Speed:</label>
                    <input onChange={this.handleSliderChange} style={{width:"50%"}} type="range" name="inputspeed" min={1} max={DEFAULT_FRAME_INTERVAL-10} step={1} value={this.state.slider}/>
                    <div >{this.state.slider}</div>
                </div>
                <div style={{width:"100%", display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <p style={{color:'black'}}>Exit to Menu:</p>
                    <button style={{width:'30%', fontFamily:'gameboy', fontSize: getFontSize(2.0), ...bgStyle('white', 'green'), margin:'10px'}} onClick={this.props.confirmLink}>
                        Yes <FontAwesomeIcon style={{color:"black"}} size="1x" icon={faSignOutAlt}/></button>
                </div>
                    <button style={{width:'30%',  fontFamily:'gameboy', fontSize: getFontSize(2.5), ...bgStyle('#FD974F', '#57ABB3'), margin:'10px'}} onClick={this.handleClose}>
                        Close <FontAwesomeIcon style={{color:"white"}} size="1x" icon={faWindowClose}/></button>
            </div>
        )
    }
    
}

export default CustomModal;