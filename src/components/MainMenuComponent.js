import React, {Component} from 'react';
import { SAVED_GAME } from '../helpers/constants';
import { solidBorder, centerBgImg } from '../helpers/funcs';



const checkSavedGame = () => {
    try {
        const serializedState = localStorage.getItem(SAVED_GAME);
        return serializedState!==null;
      } catch (err) {
        alert("Issue accessing local storage. There will be problem in saving the game!");
        return false;
      }
}

const style = {
    position: 'absolute',
    left: 0, top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
}

const MenuBtn = (props) => {
    
    const basestyle = {
        width:'350px',
        padding: '10px',
        fontFamily: 'pixel',
        fontSize:'20px',
        margin:'10px',
        backgroundColor: '#FD974F',
        ...solidBorder(2, '#57ABB3', 5),
    };

    const disbaledstyle = {
        ...basestyle,
        color: 'black',
        opacity: '0.5',
    };

    if(props.disabled) {
        return(
            <button disabled style={disbaledstyle}>{props.title}</button>
        )
    } else {
        return(
            <button onClick={function() {props.onClick();}} style={basestyle}>{props.title}</button>
        )
    }
}

class MainMenu extends Component {


    render() {
        return(
            <div style={{...style, width: this.props.width, height: this.props.height}}>
                <div style={{position:'relative', width:'100%', height: '50%', overflow:'hidden'}}>
                    <div className="animateTitle" style={{position:'absolute',width:"100%", height:"100%", marginTop:'100px',...centerBgImg('assets/images/80/objectsAndProps/title.png', null, 'auto')}}/>
                </div>
                <div className="showMenu" style={{position:'relative', width:'100%', height: '50%', display:'flex', flexDirection:'column', alignItems:'center', marginTop:'100px', opacity:0}}>
                    <MenuBtn title="Start New Game" disabled={false} onClick={this.props.startNewGame}/>
                    <MenuBtn title="Load Game" disabled={!checkSavedGame()} onClick={this.props.loadGame}/>
                </div>
            </div>
        );
    }
}

export default MainMenu;