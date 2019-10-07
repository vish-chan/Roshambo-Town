import React from 'react';

const Loading = (props) => {
    return(
    <div style={{width: '100%', height:'100%', backgroundColor:'white'}}>
        <div id="loading" style={{position: 'absolute', right: 10, bottom: 10, display:'flex', padding: '5px'}}>
            <i className="fa fa-spinner fa-pulse fa-5x fa-fw"/>
            <p style={{fontSize: '20px', fontFamily:'gameboy'}}> {props.msg}...</p>
        </div>
    </div>);
}

export default Loading;