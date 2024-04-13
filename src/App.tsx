import React from 'react';
import logo from './logo.svg';
import './App.css';
import {bestScoresPerHole, getRoundScores, getStringsForBestScoresPerHole} from "./dataHelper"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}

        <p>{getRoundScores().join(',')}</p>
          <p>{bestScoresPerHole().join(',')}</p>
          <p>{getStringsForBestScoresPerHole().join(',')}</p>

      </header>
    </div>
  );
}

export default App;
