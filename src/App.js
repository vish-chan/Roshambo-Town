import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { configureStore } from './redux/ConfigureStore';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
