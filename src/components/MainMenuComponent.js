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

    position: 'relative',
    margin: '60px auto',
    border: '10px solid white',
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(#991b1e, #b61d20, #991b1e)',
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
        ...solidBorder(2, 'white', 5),
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
            <button onClick={props.onClick} style={basestyle}>{props.title}</button>
        )
    }
}

class MainMenu extends Component {


    render() {
        return(
            <div style={{...style, width: this.props.width, height: this.props.height}}>
                <div style={{position:'relative', width:840, height: 120, margin:'100px', overflow:'hidden'}}>
                    <div  style={{ width:"100%", height:"100%", ...centerBgImg('/assets/images/80/objectsAndProps/title.png', null, 'auto')}}/>
                    <div className="shine"/>
                </div>
                <MenuBtn title="Start New Game" disabled={false} onClick={this.props.startNewGame}/>
                <MenuBtn title="Load Game" disabled={!checkSavedGame()} onClick={this.props.loadGame}/>
            </div>
        );
    }
}

export default MainMenu;