import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import World from './WorldComponent';
import { connect } from 'react-redux';


class Main extends Component {


    render() {
        return(
        <Switch>
            <Route path="/home" component={ () => <World/> }/>
            <Redirect to="/home" />
        </Switch>
        );
    }
}

export default withRouter(connect()(Main));