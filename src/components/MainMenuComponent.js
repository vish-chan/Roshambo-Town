import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, SAVED_GAME, TRUE, FALSE } from '../helpers/constants';
import { solidBorder } from '../helpers/funcs';


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
    width:  VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    border: '10px solid white',
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
}

const MenuBtn = (props) => {
    
    const style = {
        width:'350px',
        padding: '10px',
        fontFamily: 'gameboy',
        fontSize:'20px',
        ...solidBorder(2, 'white', 5),
        backgroundColor: 'grey'
    };

    const disbaledstyle = {
        width:'350px',
        padding: '10px',
        fontFamily: 'gameboy',
        fontSize:'20px',
        ...solidBorder(2, 'white', 5),
        color: 'black',
        opacity: '0.5',
        backgroundColor: 'grey'
    };

    if(props.disabled) {
        return(
            <button disabled style={disbaledstyle}>{props.title}</button>
        )
    } else {
        return(
            <button style={style}><Link to={props.to}>{props.title}</Link></button>
        )
    }
}

class MainMenu extends Component {


    render() {
        return(
            <div style={style}>
                <div style={{width:'90%', height:'40%', margin:'20px'}}>TITLE</div>
                <MenuBtn title="Start New Game" disabled={false} to={`/playerselect`}/>
                <MenuBtn title="Load Game" disabled={!checkSavedGame()} to={`/world/${TRUE}`}/>
            </div>
        );
    }
}

export default MainMenu;