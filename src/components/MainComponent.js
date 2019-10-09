import React, {Component} from 'react';
import World from './WorldComponent';
import MainMenu from './MainMenuComponent';
import PlayerSelectComponent from './PlayerSelectComponent';
import { getViewportDim } from '../helpers/funcs';

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
        this.setState({
            menu: false,
            playerselect: true,
            world: false,
            loadgame: false,
        });
    }

    handleLoadGame() {
        this.setState({
            menu: false,
            playerselect: false,
            world: true,
            loadgame: true,
        });
    }

    handleStartJourney() {
        this.setState({
            menu: false,
            playerselect: false,
            world: true,
            loadgame: false,
        })
    }

    handleBack() {
        this.setState({
            menu: true,
            playerselect: false,
            world: false,
            loadgame: false,
        })
    }

    render() {
        if(this.state.menu) {
            return(<MainMenu width={this.state.screenDim[0]} height={this.state.screenDim[1]} startNewGame={this.handleStartNewGame} loadGame={this.handleLoadGame} />);
        } else if(this.state.playerselect) {
            return( <PlayerSelectComponent width={this.state.screenDim[0]} height={this.state.screenDim[1]}  startJourney={this.handleStartJourney} handleBack={this.handleBack}/>);
        } else if(this.state.world) {
            return(<World width={this.state.screenDim[0]} height={this.state.screenDim[1]} loadgame={this.state.loadgame} handleBack={this.handleBack}/>);
        } else {
            return(<div>Unknown error. PLEASE RELOAD PAGE.</div>);
        }
    }
}

export default Main;