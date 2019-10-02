import React, { Component } from 'react';
import { VIEWPORT_WIDTH } from '../helpers/constants';
import {connect} from 'react-redux';
import { solidBorder, centerBgImg, getRounded, getKeyDiv } from '../helpers/funcs';
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

const bgStyle = (color) => {
    return({
        padding: '5px',
        backgroundColor: color,
        ...solidBorder(2, 'white', 5),
    });
}

const AwareComponent = (props) => {

    let instruction = props.player.nearbyNPC!==null? <div>Use {getKeyDiv("SPACE")} to talk</div> : null;
    instruction = props.player.nearbyGameObj!==null? <div>Use {getKeyDiv("P")} to pickup</div> : instruction;
    instruction = props.player.nearbyPortal!==null? <div>Use {getKeyDiv("E")} to enter or leave</div> : instruction;

    return(
        <div id="aware">
            {instruction}
        </div>
    );
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
            marginTop: '20px',
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
                <div style={{width:'30%', display:'flex', alignItems:'center'}}>
                    <div style={{width:80, height:80, ...centerBgImg( `${this.props.player.skin.src}/head.png`), backgroundColor:bg_color}}/>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{margin:'5px', alignSelf:'flex-start'}}> {this.props.player.name} </div>
                        <div style={{display:'flex'}}>
                            <div style={{margin:'5px', alignSelf:'flex-end', ...bgStyle('WhiteSmoke')}}> Lvl:{this.props.player.battle.level} </div>
                            <div style={{margin:'5px', alignSelf:'flex-end', ...bgStyle('WhiteSmoke')}}> Exp:{this.props.player.battle.exp} </div>
                            <div style={{margin:'5px', alignSelf:'flex-end', ...bgStyle('WhiteSmoke')}}> Win%:{getRounded(this.props.player.battle.won*100/(this.props.player.battle.won + this.props.player.battle.lost))}</div>
                        </div>
                    </div>
                </div>
                <div style={{width:'50%', height:'70%', ...solidBorder(2, 'white', 10), backgroundColor:'grey', display:'flex', flexDirection:'column', justifyContent:'center', paddingLeft:'10px'}}>
                    <AwareComponent player={this.props.player}/>
                </div>
                <div style={{width:'10%', display:'flex', alignItems: 'center'}}>
                    <button disabled={(this.props.player.isAnimating || this.props.player.frozen || this.props.player.inBattle || this.props.player.interacting)} 
                            style={{margin:'5px', ...bgStyle(), fontFamily:'gameboy'}} onClick={this.handleSaveBtnClick}><i className="fa fa-save fa-2x" style={{margin:'5px'}}/> Save
                    </button>
                </div>
            </div>
        );
    }
}


export default connect(mapStatetoProps, mapDispatchtoProps)(Stats);