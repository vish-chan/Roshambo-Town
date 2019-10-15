import React, {Component} from 'react';
import World from './WorldComponent';
import MainMenu from './MainMenuComponent';
import PlayerSelectComponent from './PlayerSelectComponent';
import { getViewportDim, playSoundEffect } from '../helpers/funcs';
import ReactHowler from 'react-howler';
import { MAIN_MENU_MUSIC, BEEP_2_SOUND, BEEP_LONG_SOUND } from '../helpers/constants';

const INITIAL_STATE = {
    menu: true,
    playerselect: false,
    world: false,
    loadgame: false,
};

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            playerselect: false,
            world: true,
            loadgame: false,
            screenDim: getViewportDim(window.screen.width),
        }
        this.handleStartNewGame = this.handleStartNewGame.bind(this);
        this.handleLoadGame = this.handleLoadGame.bind(this);
        this.handleStartJourney = this.handleStartJourney.bind(this);
        this.handleBack = this.handleBack.bind(this);
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
        let UI_COMPONENT = null, AUDIO_COMPONENT = null;
        if(this.state.menu) {
            UI_COMPONENT = <MainMenu width={this.state.screenDim[0]} height={this.state.screenDim[1]} startNewGame={this.handleStartNewGame} loadGame={this.handleLoadGame} />;
            AUDIO_COMPONENT = <ReactHowler src={MAIN_MENU_MUSIC} loop={true} html5={true} volume={0.4}/>;
        } else if(this.state.playerselect) {
            UI_COMPONENT = <PlayerSelectComponent width={this.state.screenDim[0]} height={this.state.screenDim[1]}  startJourney={this.handleStartJourney} handleBack={this.handleBack}/>;
            AUDIO_COMPONENT = <ReactHowler src={MAIN_MENU_MUSIC} loop={true} html5={true}  volume={0.4}/>;
        } else if(this.state.world) {
            UI_COMPONENT = <World width={this.state.screenDim[0]} height={this.state.screenDim[1]} loadgame={this.state.loadgame} handleBack={this.handleBack}/>;
            AUDIO_COMPONENT = null;
        } else {
            UI_COMPONENT = <div>Unknown error. PLEASE RELOAD PAGE.</div>;
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