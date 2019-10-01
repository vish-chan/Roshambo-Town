import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import World from './WorldComponent';
import MainMenu from './MainMenuComponent';
import { TRUE } from '../helpers/constants';
import PlayerSelectComponent from './PlayerSelectComponent';


class Main extends Component {

    render() {
        return(
            <Switch>
                <Route exact path="/menu" component={MainMenu} />
                <Route exact path="/playerselect" component={PlayerSelectComponent} />
                <Route exact path="/world/:loadgame" component={ ({match}) => <World loadgame={match.params.loadgame===TRUE}/> }/>
                <Redirect to="/menu" />
            </Switch>
        );
    }
}

export default Main;