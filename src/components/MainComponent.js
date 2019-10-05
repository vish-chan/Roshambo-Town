import React, {Component} from 'react';
import World from './WorldComponent';
import MainMenu from './MainMenuComponent';
import PlayerSelectComponent from './PlayerSelectComponent';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: true,
            playerselect: false,
            world: false,
            loadgame: false,
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
            return(<MainMenu startNewGame={this.handleStartNewGame} loadGame={this.handleLoadGame} />);
        } else if(this.state.playerselect) {
            return( <PlayerSelectComponent startJourney={this.handleStartJourney} handleBack={this.handleBack}/>);
        } else if(this.state.world) {
            return(<World loadgame={this.state.loadgame} handleBack={this.handleBack}/>);
        } else {
            return(<div>Unknown error. PLEASE RELOAD PAGE.</div>);
        }
    }
}

export default Main;