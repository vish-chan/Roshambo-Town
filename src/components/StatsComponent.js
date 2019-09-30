import React, { Component } from 'react';
import { VIEWPORT_WIDTH } from '../helpers/constants';
import {connect} from 'react-redux';
import { solidBorder, centerBgImg, getRounded } from '../helpers/funcs';
import { SaveGameToDisk } from '../redux/ActionCreators';


const mapStatetoProps = state => {
    return({
        player: state.player,
    });
}

const mapDispatchtoProps = dispatch => {
    return({
        saveGame: () => { dispatch(SaveGameToDisk()); },
    });
}

const bgStyle = () => {
    return({
        padding: '5px',
        backgroundColor: 'WhiteSmoke',
        ...solidBorder(2, 'white', 5),
    });
}

class Stats extends Component {
    
    constructor(props) {
        super(props);
        this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this);
    }


    handleSaveBtnClick() {
        this.props.saveGame();
    }

    render() {

        const bg_color = 'lightgrey';

        const style = {
            width:  VIEWPORT_WIDTH,
            height: 80,
            margin:  'auto',
            borderLeft:'10px solid white',
            borderRight:'10px solid white',
            borderTop: '5px solid white',
            backgroundColor: bg_color,
            color: 'black',
            fontFamily: 'gameboy',
            fontSize: '15px',
            display:'flex',
            justifyContent: 'space-between',
            alignItems:'center',
        }

        return(
            <div id="stats" style={style}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{width:80, height:80, ...centerBgImg( `${this.props.player.skin.src}/head.png`), backgroundColor:bg_color}}/>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{margin:'5px', alignSelf:'flex-start'}}> {this.props.player.name} </div>
                        <div style={{display:'flex'}}>
                            <div style={{margin:'5px', alignSelf:'flex-end', ...bgStyle()}}> Lvl:{this.props.player.battle.level} </div>
                            <div style={{margin:'5px', alignSelf:'flex-end', ...bgStyle()}}> Exp:{this.props.player.battle.exp} </div>
                            <div style={{margin:'5px', alignSelf:'flex-end', ...bgStyle()}}> Win%:{getRounded(this.props.player.battle.won*100/(this.props.player.battle.won + this.props.player.battle.lost))}</div>
                        </div>
                    </div>
                </div>
                <div style={{width:'200px', display:'flex', alignItems: 'center'}}>
                    <button disabled={(this.props.player.isAnimating || this.props.player.frozen || this.props.player.inBattle || this.props.player.interacting)} 
                            style={{margin:'5px', ...bgStyle()}} onClick={this.handleSaveBtnClick}><i className="fa fa-save fa-2x" style={{margin:'5px'}}/>
                    </button>
                    <div> Save</div>
                </div>
            </div>
        );
    }
}


export default connect(mapStatetoProps, mapDispatchtoProps)(Stats);