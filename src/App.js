import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/ConfigureStore';

function App() {
  return (
    <Provider store={ConfigureStore()}>
        <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
