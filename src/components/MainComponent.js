import React, {Component} from 'react';
import World from './WorldComponent';
import MainMenu from './MainMenuComponent';
import PlayerSelectComponent from './PlayerSelectComponent';
import { getViewportDim, playSoundEffect, centerBgImg, preloadPictures } from '../helpers/funcs';
import ReactHowler from 'react-howler';
import { MAIN_MENU_MUSIC, BEEP_2_SOUND, BEEP_LONG_SOUND, PROPS_PATH } from '../helpers/constants';
import Loading from './LoadingComponent';
import { RESOURCES } from '../data/resourcepaths';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            menu: false,
            playerselect: false,
            world: false,
            loadgame: false,
            screenDim: getViewportDim(window.screen.width, window.screen.height),
        }
        this.bg = `${PROPS_PATH}/town.png`;
        this.handleStartNewGame = this.handleStartNewGame.bind(this);
        this.handleLoadGame = this.handleLoadGame.bind(this);
        this.handleStartJourney = this.handleStartJourney.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        
        const renderMenu = function() {
            this.setState({
                loading: false,
                menu: true,
                playerselect: false,
                world: false,
                loadgame: false,
            });
        }.bind(this);

        preloadPictures(RESOURCES, renderMenu);
    }

    handleStartNewGame() {
        playSoundEffect(BEEP_2_SOUND);
        this.setState({
            menu: false,
            playerselect: true,
            world: false,
            loadgame: false,
        });
    }

    handleLoadGame() {
        playSoundEffect(BEEP_LONG_SOUND);
        this.setState({
            menu: false,
            playerselect: false,
            world: true,
            loadgame: true,
        });
    }

    handleStartJourney() {
        playSoundEffect(BEEP_LONG_SOUND);
        this.setState({
            menu: false,
            playerselect: false,
            world: true,
            loadgame: false,
        })
    }

    handleBack() {
        playSoundEffect(BEEP_2_SOUND);
        this.setState({
            menu: true,
            playerselect: false,
            world: false,
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
            UI_COMPONENT = <Loading msg="Loading Resources"/>;
            AUDIO_COMPONENT = null;
        } else if(this.state.menu) {
            UI_COMPONENT = <div style={style}><MainMenu width={this.state.screenDim[0]} height={this.state.screenDim[1]} startNewGame={this.handleStartNewGame} loadGame={this.handleLoadGame} /></div>;
            AUDIO_COMPONENT = <ReactHowler src={MAIN_MENU_MUSIC} loop={true} html5={false} volume={0.4}/>;
        } else if(this.state.playerselect) {
            UI_COMPONENT = <div style={style}><PlayerSelectComponent width={this.state.screenDim[0]} height={this.state.screenDim[1]}  startJourney={this.handleStartJourney} handleBack={this.handleBack}/></div>;
            AUDIO_COMPONENT = <ReactHowler src={MAIN_MENU_MUSIC} loop={true} html5={false}  volume={0.4}/>;
        } else if(this.state.world) {
            UI_COMPONENT = <World width={this.state.screenDim[0]} height={this.state.screenDim[1]} loadgame={this.state.loadgame} handleBack={this.handleBack}/>;
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