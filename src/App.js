import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/ConfigureStore';

function App() {
  return (
    <Provider store={ConfigureStore()}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/game" component={Main} />
            <Redirect to="/game" />
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
