import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROCK, PAPER, SCISSORS, SPACE_KEY, BATTLE_END_MUSIC, BEEP_SOUND, PROPS_PATH } from '../helpers/constants';
import { BattleHandleMove, BattleMoveIndexToStr, BattleEndIntro, CloseBattleSequence } from '../redux/ActionCreators';
import { centerBgImg, solidBorder, getKeyDiv, getLevelColor, playSoundEffect, getFontSize } from '../helpers/funcs';
import ReactHowler from 'react-howler';

const mapStatetoProps = state => {
    return({
        battle: state.battle,
    })
}

const mapDispatchtoProps = dispatch => {
    return({
        submitMove: (move) => { dispatch(BattleHandleMove(parseInt(move))); } ,
        endIntro: () => {dispatch(BattleEndIntro());}, 
        closeBattle: () => {dispatch(CloseBattleSequence())},
    })
}

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
                <div style={{fontSize: getFontSize(2), marginRight:'10px'}}>HP</div>
                <div style={{width:'90%', height: '30%',...solidBorder(1, 'white', 0), backgroundColor: 'white' }}>
                    <div style={{position: 'relative', width:`${(this.props.currhealth/this.props.maxhealth)*100}%`, height:'100%', ...solidBorder(0, 'white', 0), backgroundImage: 'linear-gradient(mediumseagreen, forestgreen, mediumseagreen)'}}>
                        <div style={{position:'absolute', left:'40%', top:'15%', fontSize:getFontSize(2)}}>{Math.floor((this.props.currhealth/this.props.maxhealth)*100)}%</div>
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
        backgroundColor: getLevelColor(props.player.level),
        ...solidBorder(2, 'black', 5),
        color: 'black',
        fontSize: getFontSize(2.5),
        fontFamily: 'gameboy_lg',
        display: 'flex',
        flexDirection: props.reverse? 'row-reverse' : 'row',
        justifyContent:'space-between'
    }
    return(
        <div style={style}>
            <div style={{width:'30%', height:'90%', alignSelf:'center', margin: '5px', ...centerBgImg(`${props.player.src}/head.png`, "lightgrey"), ...solidBorder(2, 'grey', 5) }}/>
            <div style={{width:'70%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-around', alignSelf:'center', margin: '5px'}}>
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <div>{props.player.name}</div>
                    <div style={{color:'yellow', fontSize:getFontSize(2)}}>Lvl:{props.player.level}</div>
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
        this.image.style.backgroundImage = `url('${PROPS_PATH}/${BattleMoveIndexToStr(this.props.move)}.png')`;
        this.image.classList.add(this.className);
    }

    componentDidUpdate() {
        this.timeout = [];
        this.timeout.push(setTimeout(function() {
            if(this.image) {
                this.image.style.backgroundImage = `url('${PROPS_PATH}/${BattleMoveIndexToStr(this.props.move)}.png')`;
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
            backgroundRepeat: 'no-repeat', 
            backgroundPosition:'center',
            backgroundSize: 'contain',
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
        const animate = function() {
            if(idx > text.length)
                return;
            p.innerHTML = text.substring(0, idx);
            idx++;
            this.timeout = setTimeout(animate, 10);
        }.bind(this);
        animate();
    }

    componentDidMount() {
        this.animateText(this.props.summary);
    }

    componentDidUpdate() {
        clearTimeout(this.timeout);
        this.animateText(this.props.summary);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {

        const style = {
            border: '10px solid #db5435',
            borderRadius:'20px',
            width: '70%',
            padding: '5px',
            backgroundColor: '#639aa1',
            color: 'white',
            fontSize: getFontSize(3),
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
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.continue = false;
        if(this.props.winner===1) {
            this.winnerStr =  `${this.props.player.name} WON!`;
            this.winnerClass = "wonBlink";
        } else {
            this.winnerStr = `${this.props.player.name} LOST!`;
            this.winnerClass = "lostBlink";
        }
        this.levelColor =  getLevelColor(this.props.player.level);
        this.levelArrow = this.props.player.level>this.props.player.initialStats.level?` <i class="fa fa-arrow-up blink"></i>`:"";

        this.animateText = this.animateText.bind(this);
        this.timeout = null;
    }

    handleKeyDown(event) {        
        if(SPACE_KEY.includes( event.keyCode) && this.continue)
            this.props.closeBattle();
    }


    animateText(base, from, to, speed, ref, count) {
        const animate = function() {
            if(from>to) {
                count++;
                if(count===1) {
                    this.timeout = setTimeout(function() {this.animateText("Exp", this.props.player.initialStats.exp, this.props.player.exp, 40, this.exp, count)}.bind(this), 200);
                } else if(count===2) {
                    this.timeout = setTimeout(function() {this.animateText("Level", this.props.player.initialStats.level, this.props.player.level, 100, this.level, count);}.bind(this),200);
                } else if (count===3) {
                    this.level.style.color = this.levelColor;
                    this.level.innerHTML+=this.levelArrow;
                    this.cont.style.opacity = 1;
                    this.continue = true;
                }
                return;
            }
            playSoundEffect(BEEP_SOUND);
            ref.innerHTML = `${base}: ${from}`;
            from++;
            this.timeout = setTimeout(animate, speed);
        }.bind(this);

        animate();
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        this.timeout = setTimeout(function(){this.animateText("Score", 0, this.props.player.score, 40, this.score, 0)}.bind(this), 600);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return(
            <div  id="battleEnd" className="moveInLR" style={{position:'absolute', width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', fontSize: getFontSize(2.5) ,fontFamily:'gameboy',  backgroundImage: 'repeating-linear-gradient(#def3c6, #def3c6 20px, #e7f6db 20px, #e7f6db 23px)'}}>
                <div style={{width:'100%', height:'60%', display:'flex', justifyContent:'center'}}>
                    <div style={{width:'60%', height: '100%', display:'flex', justifyContent:'center', backgroundColor: '#f7f8f7',...solidBorder(10, '#00b1b7', 10), color:'#5d5f5b'}}> 
                            <div style={{width:'40%', height:'60%', display:'flex', flexDirection:'column', alignSelf:'center'}}>
                                <div style={{width:'240px', height:'240px', alignSelf:'center', ...centerBgImg(`${this.props.player.src}/head.png`, "lightgrey"), ...solidBorder(2, 'grey', 5) }}/>
                                <div style={{alignSelf:'center', fontSize: getFontSize(3)}}>{this.props.player.name}</div>
                            </div> 
                            <div style={{width:'50%', height:'60%', display:'flex', flexDirection:'column', alignSelf:'center', fontSize: getFontSize(2.5)}}>
                                <div className={this.winnerClass} style={{alignSelf:'center', fontSize: getFontSize(3.5), marginBottom:'20px'}}>{this.winnerStr}</div>
                                <div ref={score => this.score=score} style={{margin:'5px 0px 0px 10px'}}></div>
                                <div  ref={exp => this.exp=exp}  style={{margin:'5px 0px 0px 10px'}}></div>
                                <div  ref={level => this.level=level} style={{margin:'5px 0px 0px 10px', color: this.levelColor}}></div>
                            </div>
                    </div>
                </div> 
                <div className="blinkContinue" ref={cont => this.cont=cont} style={{alignSelf:'center', marginTop:'40px', opacity:0, color:'#5d5f5b'}}>Press {getKeyDiv("SPACE", 25)} to continue...</div>          
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
            fontFamily:'gameboy', fontSize: getFontSize(6),
            backgroundColor:'white'
        }

        return(
            <div id="battleIntro" style={style}>
                <div style={{position:'relative', height: '35%', backgroundColor: character_bg}}>
                    <div  className="battleIntroRL" style={{position:'absolute', top: '30%', width: '120px', height: '120px', ...centerBgImg(`${this.props.npc.src}/head.png`), backgroundColor: character_bg, }}></div>
                </div>
                <div style={{position:'relative', height: '30%', display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="battleIntroVS">
                        VS
                    </div>
                </div>
                <div style={{position:'relative', height: '35%', backgroundColor: character_bg}}>
                    <div  className="battleIntroLR" style={{position:'absolute', top: '30%', width: '120px', height: '120px', ...centerBgImg(`${this.props.player.src}/head.png`), backgroundColor: character_bg}} />
                </div> 
            </div>
        );
    }
}

class BattleArena extends Component {

    constructor(props) {
        super(props);
        this.handleMoveSelect = this.handleMoveSelect.bind(this);
    }

    handleMoveSelect() {
        if(this.select.disabled)
            return;
        this.select.disabled = true;
        this.props.submitMove(this.select.value);
        setTimeout(function() {
            if(this.select) {
                this.select.disabled = false; 
            }
        }.bind(this), 1100);
    }

    render() {
            return(
                <div  id="battle" style={{position:'absolute', width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', backgroundImage: 'repeating-linear-gradient(#def3c6, #def3c6 20px, #e7f6db 20px, #e7f6db 23px)'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: '25%', marginBottom: '5px'}}>
                         <PlayerInfo player={this.props.battle.player} reverse={false} blink={this.props.battle.lastWinner===-1} />    
                         <PlayerInfo player={this.props.battle.npc} reverse={true} blink={this.props.battle.lastWinner===1}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: '50%', marginBottom: '5px'}}>
                        <MoveDiv move={this.props.battle.player.lastMove} reverse={false} blink={this.props.battle.lastWinner===-1}/>
                        <MoveDiv move={this.props.battle.npc.lastMove} reverse={true} blink={this.props.battle.lastWinner===1}/>
                    </div>
                    <div style={{display: 'flex', width: '100%', height: '25%'}}>
                        <select onClick={this.handleMoveSelect} defaultValue={ROCK} style={{fontFamily:'gameboy_lg', fontSize: getFontSize(3), overflowY:'hidden', width: '30%', backgroundColor:'#f9f6d6', ...solidBorder(8, '#4d655e', 10)}} ref={select => this.select = select} size={3}>
                                <option style={{padding:'10px 0'}} value={ROCK} >Rock</option>
                                <option style={{padding:'10px 0'}} value={PAPER}>Paper</option>
                                <option style={{padding:'10px 0'}} value={SCISSORS}>Scissors</option>
                        </select>
                        <Summary summary={this.props.battle.summary} />
                    </div>
                </div> 
            );
    }
}



class Battle extends Component {

    componentDidMount() {
        if(this.props.battle.inIntro){
            setTimeout(function() {
                if(this.props) 
                    this.props.endIntro();
            }.bind(this), 3000);
        }
    }
    
    render() {
        let UI_COMPONENT = null, AUDIO_COMPONENT = null;
        if(this.props.battle.inIntro) {
               UI_COMPONENT =  <BattleIntro player={this.props.battle.player} npc={this.props.battle.npc} />;
               AUDIO_COMPONENT = <ReactHowler src={this.props.battle.music} loop={true} html5={false} volume={0.5}/>;

        } else if(this.props.battle.inEnd) {
                UI_COMPONENT = <BattleEnd player={this.props.battle.player} winner={this.props.battle.finalWinner} closeBattle={this.props.closeBattle} />;
                AUDIO_COMPONENT = <ReactHowler src={BATTLE_END_MUSIC} volume={0.3}/>;
        
        } else {
               UI_COMPONENT = <BattleArena battle={this.props.battle} submitMove={this.props.submitMove} />;
               AUDIO_COMPONENT = <ReactHowler src={this.props.battle.music} loop={true} html5={false} volume={0.5}/>;
        } 
        return(
            <div>
                {UI_COMPONENT}
                {AUDIO_COMPONENT}
            </div>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Battle);