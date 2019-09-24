import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VIEWPORT_WIDTH, ARROW_KEYCODES, ENTER_KEY, ROCK, PAPER, SCISSORS, VIEWPORT_HEIGHT } from '../helpers/constants';
import { BattleHandleMove, BattleMoveIndexToStr, BattleEndIntro } from '../redux/ActionCreators';
import { centerBgImg, solidBorder } from '../helpers/funcs';

const mapStatetoProps = state => {
    return({
        battle: state.battle,
    })
}

const mapDispatchtoProps = dispatch => {
    return({
        submitMove: (move) => { dispatch(BattleHandleMove(parseInt(move))); } ,
        endIntro: () => {dispatch(BattleEndIntro());}, 
    })
}

const FONT_ANIMATION = 30;

class HealthBar extends Component {

    constructor(props) {
        super(props);
        this.timeout = null;
    }

    componentDidUpdate() {
        if(this.props.blink) {
            this.timeout = setTimeout(function(){
                this.hb.classList.add('blinkmomentary');
            }.bind(this), 50);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        if(this.hb) {
            this.hb.classList.remove('blinkmomentary');
        }

        return(
            <div ref={hb => this.hb = hb} style={{width:'90%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{fontSize: '20px', marginRight:'10px'}}>HP</div>
                <div style={{width:'90%', height: '30%',...solidBorder(1, 'white', 0), backgroundColor: 'white' }}>
                    <div style={{position: 'relative', width:`${(this.props.currhealth/this.props.maxhealth)*100}%`, height:'100%', ...solidBorder(0, 'white', 0), backgroundImage: 'linear-gradient(mediumseagreen, forestgreen, mediumseagreen)'}}>
                        <div style={{position:'absolute', left:'40%', top:'15%', fontSize:'20px'}}>{(this.props.currhealth/this.props.maxhealth)*100}%</div>
                    </div>
                </div>
            </div>
        );
     }
}


const PlayerInfo = (props) => {

    const style = {
        width: '40%',
        height: '100%',
        backgroundColor: props.bgcolor,
        color: 'black',
        fontSize: '25px',
        fontFamily: 'gameboy',
        display: 'flex',
        flexDirection: props.reverse? 'row-reverse' : 'row',
        justifyContent:'space-between'
    }
    return(
        <div style={style}>
            <div style={{width:'30%', height:'90%', alignSelf:'center', margin: '5px', ...centerBgImg("assets/images/80/player_head.png"), ...solidBorder(2, 'grey', 5) }}/>
            <div style={{width:'70%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-around', alignSelf:'center', margin: '5px'}}>
                <div>{props.name}</div>
                <HealthBar maxhealth={props.maxhealth} currhealth={props.currhealth} blink={props.blink}/>
            </div> 
        </div>
    )
}


class MoveDiv extends Component  {

    constructor(props) {
        super(props);
        this.timeout = null;
        this.className = this.props.reverse? "moveInRL": "moveInLR";
    }

    componentDidMount() {
        this.image.style.backgroundImage = `url('assets/images/80/objectsAndProps/${BattleMoveIndexToStr(this.props.move)}.png')`;
        this.image.classList.add(this.className);
    }

    componentDidUpdate() {
        this.timeout = setTimeout(function(){
            this.image.style.backgroundImage = `url('assets/images/80/objectsAndProps/${BattleMoveIndexToStr(this.props.move)}.png')`;
            this.image.classList.add(this.className);
        }.bind(this), 50);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const style = {
            position: "relative",
            width: '50%',
            height: '100%',
        }

        const imgStyle = {
            width: '100%',
            height: '100%',
            position: "absolute",
            backgroundColor: 'white', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition:'center',
            transform: this.props.reverse? 'rotate(180deg)' : 'rotate(0deg)',
        }

        if(this.image) {
            this.image.classList.remove(this.className)
        };

        return(
                <div style={style}>
                    <div ref={image => this.image=image} style={imgStyle}></div>
                </div>
        );
    }
}

class Summary extends Component {

    constructor(props) {
        super(props);
        this.timeout = null;
    }

    animateText(text) {
        let idx = 0; const p = this.p;
        function animate() {
            if(idx > text.length)
                return;
            p.innerHTML = text.substring(0, idx);
            idx++;
            this.timeout = setTimeout(boundanimate, FONT_ANIMATION);
        }
        const boundanimate = animate.bind(this);
        boundanimate();
    }

    componentDidMount() {
        this.animateText(this.props.summary);
    }

    componentDidUpdate() {
        clearTimeout(this.timeout);
        this.animateText(this.props.summary);
    }

    render() {

        const style = {
            border: '5px inset black',
            width: VIEWPORT_WIDTH-600,
            padding: '5px',
            backgroundColor: 'lightgrey',
            color: 'black',
            fontSize: '30px',
            fontFamily: 'gameboy',
            overflowWrap: 'break-word',
        };

        return(
            <div id="summary" style={style}>
                <p ref={p => this.p = p}></p>
            </div>
        );

    }     
}

class BattleIntro extends Component {
    
    render() {
        const style={
            position:'absolute', 
            width:'100%', height:'100%',
            display:'flex', flexDirection:'column', justifyContent:'space-between',
            fontFamily:'gameboy', fontSize: '60px',
        }

        return(
            <div style={style}>
                <div style={{position:'relative', height: '35%', backgroundColor:'lightgrey'}}>
                    <div  className="battleIntroRL" style={{position:'absolute', top: '30%', width: '120px', height: '120px', ...centerBgImg("assets/images/80/player_head.png")}}></div>
                </div>
                <div style={{position:'relative', height: '30%', display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="battleIntroVS">
                        VS
                    </div>
                </div>
                <div style={{position:'relative', height: '35%', backgroundColor:'lightgrey'}}>
                    <div  className="battleIntroLR" style={{position:'absolute', top: '30%', width: '120px', height: '120px', ...centerBgImg("assets/images/80/player_head.png")}} />
                </div> 
            </div>
        );
    }
}



class Battle extends Component {

    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        if(!this.props.battle.inIntro) {
            window.addEventListener('keydown', this.handleKeyDown);
            this.select.focus();
        } else if(this.props.battle.inIntro){
            setTimeout(function(){
                this.props.endIntro();
            }.bind(this), 3000);
        }
    }

    componentDidUpdate() {
        if(!this.props.battle.inIntro) {
            window.addEventListener('keydown', this.handleKeyDown);
            this.select.focus();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        const keyCode = event.keyCode;
        if(ARROW_KEYCODES.includes(keyCode)) {
            this.select.focus();
        } else if(ENTER_KEY.includes(keyCode)) {
            this.props.submitMove(this.select.value);
        }
    }

    render() {
        if(this.props.battle.inIntro) {
            return(
                <BattleIntro player={this.props.battle.player} npc={this.props.battle.npc} />
            );

        } else {
            return(
                <div  id="battle" style={{position:'absolute', width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: '25%', marginBottom: '5px'}}>
                         <PlayerInfo name={this.props.battle.player.name} maxhealth={this.props.battle.player.maxLives} currhealth={this.props.battle.player.lives} reverse={false} bgcolor='Dodgerblue' blink={this.props.battle.lastWinner===-1} />    
                         <PlayerInfo name={this.props.battle.npc.name} maxhealth={this.props.battle.npc.maxLives} currhealth={this.props.battle.npc.lives} reverse={true} bgcolor='crimson' blink={this.props.battle.lastWinner===1}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: '50%', marginBottom: '5px'}}>
                        <MoveDiv move={this.props.battle.player.lastMove} reverse={false}/>
                        <MoveDiv move={this.props.battle.npc.lastMove} reverse={true}/>
                    </div>
                    <div style={{display: 'flex', width: VIEWPORT_WIDTH, height: '25%'}}>
                        <select defaultValue={ROCK} style={{fontFamily:'gameboy', fontSize:'30px', overflowY:'hidden', width: 600}} ref={select => this.select = select} size={3}>
                                <option value={ROCK} >Rock</option>
                                <option value={PAPER}>Paper</option>
                                <option value={SCISSORS}>Scissors</option>
                        </select>
                        <Summary summary={this.props.battle.summary} />
                    </div>
                </div> 
            );
        } 
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Battle);