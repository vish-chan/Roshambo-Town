import React from 'react';
import { PROPS_PATH } from '../helpers/constants';
import { getFontSize } from '../helpers/funcs';

const Loading = (props) => {
    return(
    <div style={{width: '100%', height:'100%',  backgroundImage: 'linear-gradient(#991b1e, #b61d20, #991b1e)'}}>
        <div id="loading" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display:'flex', flexDirection:'column', padding: '5px', alignItems:'center'}}>
            <div  style={{}}><img className="rotate" style={{width:250, height:250}} src={`${PROPS_PATH}/loading.png`} alt="Loading"></img></div>
            <p style={{fontSize: getFontSize(2.5), fontFamily:'gameboy', color:'white'}}> {props.msg}...</p>
        </div>
    </div>);
}

export default Loading;