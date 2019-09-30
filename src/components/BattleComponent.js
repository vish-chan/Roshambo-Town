import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VIEWPORT_WIDTH, ARROW_KEYCODES, ENTER_KEY, ROCK, PAPER, SCISSORS, SPACE_KEY } from '../helpers/constants';
import { BattleHandleMove, BattleMoveIndexToStr, BattleEndIntro, CloseBattle } from '../redux/ActionCreators';
import { centerBgImg, solidBorder, getKeyDiv } from '../helpers/funcs';

const mapStatetoProps = state => {
    return({
        battle: state.battle,
    })
}

const mapDispatchtoProps = dispatch => {
    return({
        submitMove: (move) => { dispatch(BattleHandleMove(parseInt(move))); } ,
        endIntro: () => {dispatch(BattleEndIntro());}, 
        closeBattle: () => {dispatch(CloseBattle());},
    })
}

const FONT_ANIMATION = 20;

class HealthBar extends Component {

    constructor(props) {
        super(props);
        this.timeout = null;
    }

    componentDidUpdate() {
        if(this.props.blink) {
            this.timeout = setTimeout(function(){
                this.hb.classList.add('blinkmomentary');
            }.bind(this), 600);
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
                        <div style={{position:'absolute', left:'40%', top:'15%', fontSize:'20px'}}>{Math.floor((this.props.currhealth/this.props.maxhealth)*100)}%</div>
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
            <div style={{width:'30%', height:'90%', alignSelf:'center', margin: '5px', ...centerBgImg(props.player.src+"/head.png"), ...solidBorder(2, 'grey', 5) }}/>
            <div style={{width:'70%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-around', alignSelf:'center', margin: '5px'}}>
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <div>{props.player.name}</div>
                    <div style={{color:'yellow', fontSize:'20px'}}>Lvl:{props.player.level}</div>
                </div>
                <HealthBar maxhealth={props.player.maxLives} currhealth={props.player.lives} blink={props.blink}/>
            </div> 
        </div>
    )
}


class MoveDiv extends Component  {

    constructor(props) {
        super(props);
        this.timeout = [];
        this.className = this.props.reverse? "moveInRL": "moveInLR";
    }

    componentDidMount() {
        this.image.style.backgroundImage = `url('assets/images/80/objectsAndProps/${BattleMoveIndexToStr(this.props.move)}.png')`;
        this.image.classList.add(this.className);
    }

    componentDidUpdate() {
        this.timeout = [];
        this.timeout.push(setTimeout(function() {
            if(this.image) {
                this.image.style.backgroundImage = `url('assets/images/80/objectsAndProps/${BattleMoveIndexToStr(this.props.move)}.png')`;
                this.image.classList.add(this.className);
            }
        }.bind(this), 50));
        if(this.props.blink) {
            this.timeout.push(setTimeout(function() {
                if(this.image) {
                    this.image.classList.add("blinkmomentary");
                }
            }.bind(this), 600));
        }
    }

    componentWillUnmount() {
        this.timeout.map(timeout => clearTimeout(timeout));
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
            this.image.classList.remove(this.className);
            this.image.classList.remove("blinkmomentary");
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



class BattleEnd extends Component {

    constructor(props) {
        super(props);
        if(this.props.winner===1) {
            this.winnerStr =  `${this.props.player.name} WON!`;
            this.winnerClass = "wonBlink";
        } else {
            this.winnerStr = `${this.props.player.name} LOST!`;
            this.winnerClass = "lostBlink";
        }
        this.levelColor =  this.props.player.level>this.props.player.initialStats.level?"forestgreen":"black";
        this.levelArrow = this.props.player.level>this.props.player.initialStats.level? "inline-block":"none";
    }

    render() {
        return(
            <div  id="battleEnd" className="moveInLR" style={{position:'relative', width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', fontSize:'25px' ,fontFamily:'gameboy'}}>
                <div style={{width:'100%', height:'60%', display:'flex', justifyContent:'center'}}>
                    <div style={{width:'60%', height: '100%', display:'flex', justifyContent:'center', backgroundColor: 'lightgrey'}}> 
                            <div style={{width:'40%', height:'60%', display:'flex', flexDirection:'column', alignSelf:'center'}}>
                                <div style={{width:'240px', height:'240px', alignSelf:'center', ...centerBgImg(this.props.player.src+"/head.png"), ...solidBorder(2, 'grey', 5) }}/>
                                <div style={{alignSelf:'center', fontSize:'30px'}}>{this.props.player.name}</div>
                            </div> 
                            <div style={{width:'50%', height:'60%', display:'flex', flexDirection:'column', alignSelf:'center', fontSize:'25px'}}>
                                <div className={this.winnerClass} style={{alignSelf:'center', fontSize:'35px', marginBottom:'20px'}}>{this.winnerStr}</div>
                                <div className="appearScore"  style={{margin:'5px 0px 0px 10px', opacity:0}}>Score: {this.props.player.score}</div>
                                <div className="appearExp" style={{margin:'5px 0px 0px 10px', opacity:0}}>Exp: {this.props.player.exp}</div>
                                <div className="appearLevel" style={{margin:'5px 0px 0px 10px', opacity:0, color: this.levelColor}}>Level: {this.props.player.level} <i class="fa fa-arrow-up blink" style={{display: this.levelArrow}}></i></div>
                            </div>
                    </div>
                </div> 
                <div className="blinkContinue" style={{alignSelf:'center', marginTop:'20px', opacity:0}}>Press {getKeyDiv("SPACE", 25)} to continue..</div>          
            </div> 
        );
    }
}

class BattleIntro extends Component {

    render() {
        const character_bg = 'lightgrey';

        const style={
            position:'absolute', 
            width:'100%', height:'100%',
            display:'flex', flexDirection:'column', justifyContent:'space-between',
            fontFamily:'gameboy', fontSize: '60px',
        }

        return(
            <div id="battleIntro" style={style}>
                <div style={{position:'relative', height: '35%', backgroundColor: character_bg}}>
                    <div  className="battleIntroRL" style={{position:'absolute', top: '30%', width: '120px', height: '120px', ...centerBgImg(this.props.npc.src+"/head.png"), backgroundColor: character_bg, }}></div>
                </div>
                <div style={{position:'relative', height: '30%', display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="battleIntroVS">
                        VS
                    </div>
                </div>
                <div style={{position:'relative', height: '35%', backgroundColor: character_bg}}>
                    <div  className="battleIntroLR" style={{position:'absolute', top: '30%', width: '120px', height: '120px', ...centerBgImg(this.props.player.src+"/head.png"), backgroundColor: character_bg}} />
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
        window.addEventListener('keydown', this.handleKeyDown);
        if(this.props.battle.inIntro){
            setTimeout(function() {
                if(this.props) 
                    this.props.endIntro();
            }.bind(this), 3000);
        }
    }

    componentDidUpdate() {
        if(!(this.props.battle.inIntro || this.props.battle.inEnd)) {
            this.select.focus();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if(this.props.battle.inIntro)
            return;
        
        const keyCode = event.keyCode;
        if(this.props.battle.inEnd) {
            if(SPACE_KEY.includes(keyCode))
                this.props.closeBattle();
        } else {
            if(ARROW_KEYCODES.includes(keyCode)) {
                this.select.focus();
            } else if(ENTER_KEY.includes(keyCode)) {
                if(this.select.disabled)
                    return;
                this.select.disabled = true;
                this.props.submitMove(this.select.value);
                setTimeout(function() {
                    if(this.select) {
                        this.select.disabled = false; 
                        this.select.focus();
                    }
                }.bind(this), 1000);
            }
        }
    }

    render() {
        if(this.props.battle.inIntro) {
            return(
                <BattleIntro player={this.props.battle.player} npc={this.props.battle.npc} />
            );

        } else if(this.props.battle.inEnd) {
            return(
                <BattleEnd player={this.props.battle.player} winner={this.props.battle.finalWinner} />
            );
        } else {
            return(
                <div  id="battle" style={{position:'absolute', width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: '25%', marginBottom: '5px'}}>
                         <PlayerInfo player={this.props.battle.player} reverse={false} bgcolor='Dodgerblue' blink={this.props.battle.lastWinner===-1} />    
                         <PlayerInfo player={this.props.battle.npc} reverse={true} bgcolor='crimson' blink={this.props.battle.lastWinner===1}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: '50%', marginBottom: '5px'}}>
                        <MoveDiv move={this.props.battle.player.lastMove} reverse={false} blink={this.props.battle.lastWinner===-1}/>
                        <MoveDiv move={this.props.battle.npc.lastMove} reverse={true} blink={this.props.battle.lastWinner===1}/>
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