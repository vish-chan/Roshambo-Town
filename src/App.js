import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/ConfigureStore';

function App() {
  return (
    <Provider store={ConfigureStore()}>
        <Main />
    </Provider>
  );
}

export default App;
