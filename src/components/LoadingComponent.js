import React from 'react';
import { PROPS_PATH } from '../helpers/constants';
import { getFontSize } from '../helpers/funcs';

const Loading = (props) => {
    return(
    <div style={{width: '100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div id="loading" style={{display:'flex', flexDirection:'column', padding: '5px', alignItems:'center'}}>
            <div  style={{}}><img className="rotate" style={{width:250, height:250}} src={`${PROPS_PATH}/loading.png`} alt="Loading"></img></div>
            <p style={{fontSize: getFontSize(2.5), fontFamily:'gameboy', color:'white'}}> {props.msg}</p>
        </div>
    </div>);
}

export default Loading;