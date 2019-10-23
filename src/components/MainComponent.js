import React, {Component} from 'react';
import Game from './GameComponent';
import MainMenu from './MainMenuComponent';
import PlayerSelectComponent from './PlayerSelectComponent';
import { getViewportDim, playSoundEffect, centerBgImg, getFontSize, solidBorder } from '../helpers/funcs';
import ReactHowler from 'react-howler';
import { MAIN_MENU_MUSIC, BEEP_2_SOUND, BEEP_LONG_SOUND, PROPS_PATH } from '../helpers/constants';
import Loading from './LoadingComponent';
import { RESOURCES } from '../data/resourcepaths';


const LoadingResources = (props) => {

    const style = {
        position: 'relative',
        margin: '60px auto',
        border: '10px solid white',
        overflow: 'hidden',
        width: props.width,
        height: props.height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black',
    }

    return(
        <div style={style}>
            <div style={{width:'100%', height:'60%'}}>
                <Loading msg={props.msg}/>
            </div>
            <div style={{width:'60%', height:'40%'}}>
                <progress style={{position:'relative', width:'100%', height:20}} value={props.done} max={props.total}>
                    {`${Math.ceil(props.done/props.total*100)}%`}
                </progress>
            </div>
        </div>
    )
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            menu: false,
            playerselect: false,
            game: false,
            loadgame: false,
            screenDim: getViewportDim(window.screen.width, window.screen.height),
            resourceTotal: RESOURCES.length,
            resourceDone: 0,
        }
        this.bg = `${PROPS_PATH}/town.png`;
        this.handleStartNewGame = this.handleStartNewGame.bind(this);
        this.handleLoadGame = this.handleLoadGame.bind(this);
        this.handleStartJourney = this.handleStartJourney.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    

    preloadPictures (pictureUrls, callback) {
        let i,
            j,
            loaded = 0;
    
        for (i = 0, j = pictureUrls.length; i < j; i++) {
            (function (img, src) {
                img.onload = function () {
                    this.setState({
                        resourceDone: ++loaded,
                    });                               
                    if (loaded >= pictureUrls.length && callback) {
                        callback();
                    }
                }.bind(this);
                img.src = src;
            }.bind(this) (new Image(), pictureUrls[i]));
        }
    };

    componentDidMount() {
        
        const renderMenu = function() {
            this.setState({
                loading: false,
                menu: true,
                playerselect: false,
                game: false,
                loadgame: false,
            });
        }.bind(this);

        this.preloadPictures(RESOURCES, renderMenu);
    }

    handleStartNewGame() {
        playSoundEffect(BEEP_2_SOUND);
        this.setState({
            menu: false,
            playerselect: true,
            game: false,
            loadgame: false,
        });
    }

    handleLoadGame() {
        playSoundEffect(BEEP_LONG_SOUND);
        this.setState({
            menu: false,
            playerselect: false,
            game: true,
            loadgame: true,
        });
    }

    handleStartJourney() {
        playSoundEffect(BEEP_LONG_SOUND);
        this.setState({
            menu: false,
            playerselect: false,
            game: true,
            loadgame: false,
        })
    }

    handleBack() {
        playSoundEffect(BEEP_2_SOUND);
        this.setState({
            menu: true,
            playerselect: false,
            game: false,
            loadgame: false,
        })
    }

    render() {
        
        const style = {
            position: 'relative',
            margin: '60px auto',
            border: '10px solid white',
            overflow: 'hidden',
            width: this.state.screenDim[0],
            height: this.state.screenDim[1],
            ...centerBgImg(this.bg, 'black', 'cover'),
        }

        let UI_COMPONENT = null, AUDIO_COMPONENT = null;

        if(this.state.loading) {
            UI_COMPONENT = <LoadingResources width={this.state.screenDim[0]} height={this.state.screenDim[1]} msg="Loading Resources" total={this.state.resourceTotal} done={this.state.resourceDone}/>;
            AUDIO_COMPONENT = null;
        } else if(this.state.menu) {
            UI_COMPONENT = <div style={style}><MainMenu width={this.state.screenDim[0]} height={this.state.screenDim[1]} startNewGame={this.handleStartNewGame} loadGame={this.handleLoadGame} /></div>;
            AUDIO_COMPONENT = <ReactHowler src={MAIN_MENU_MUSIC} loop={true} html5={false} volume={0.4}/>;
        } else if(this.state.playerselect) {
            UI_COMPONENT = <div style={style}><PlayerSelectComponent width={this.state.screenDim[0]} height={this.state.screenDim[1]}  startJourney={this.handleStartJourney} handleBack={this.handleBack}/></div>;
            AUDIO_COMPONENT = <ReactHowler src={MAIN_MENU_MUSIC} loop={true} html5={false}  volume={0.4}/>;
        } else if(this.state.game) {
            UI_COMPONENT = <Game width={this.state.screenDim[0]} height={this.state.screenDim[1]} loadgame={this.state.loadgame} handleBack={this.handleBack}/>;
            AUDIO_COMPONENT = null;
        } else {
            UI_COMPONENT = <div style={{fontFamily:'gameboy', fontSize:'20px', color:'white'}}>Unknown error. PLEASE RELOAD PAGE.</div>;
            AUDIO_COMPONENT = null;
        }

        return(
            <React.Fragment>
                {UI_COMPONENT}
                {AUDIO_COMPONENT}
            </React.Fragment>
        )
    }
}

export default Main;