import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Main from './components/MainComponent';
import AudioEffects from './components/AudioEffects';
import { ConfigureStore } from './redux/ConfigureStore';

function App() {
  return (
    <Provider store={ConfigureStore()}>
        <Main />
        <AudioEffects />
    </Provider>
  );
}

export default App;
