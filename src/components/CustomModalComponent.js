import React from 'react';
import { solidBorder } from '../helpers/funcs';
import { faCheckSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const bgStyle = (bgcolor, bordercolor) => {
    return({
        padding: '5px',
        backgroundColor: bgcolor,
        ...solidBorder(2, bordercolor, 5),
    });
}

const CustomModal = (props) => {
    const style = {
        position: 'absolute',
        width: 600,
        height: 250,
        ...solidBorder(5, 'grey', 5), 
        left:'50%',
        top:'50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
        backgroundColor:'whitesmoke',
        display: props.show? "flex": "none",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontFamily: 'gameboy',
        fontSize:'25px',
    };

    return(
        <div style={style}>
            <p style={{color:'black'}}>Exit to Main Menu?</p>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <button style={{width:'230px',  fontFamily:'gameboy', fontSize:'23px', ...bgStyle('MediumSeaGreen', 'green'), margin:'10px'}} onClick={props.confirmLink}>
                    Confirm <FontAwesomeIcon style={{color:"white"}} size="1x" icon={faCheckSquare}/></button>
                <button style={{width:'230px', fontFamily:'gameboy', fontSize:'23px', ...bgStyle('OrangeRed', 'red'), margin:'10px'}} onClick={props.cancelLink}>
                    Cancel <FontAwesomeIcon style={{color:"white"}} size="1x" icon={faWindowClose}/></button>
            </div>
        </div>
    )
}

export default CustomModal;