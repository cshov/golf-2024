import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    getTheHolesBirdied, getTheHolesEagled,
    getTransformedRounds
} from "./dataHelper"
import Round from "./components/Round/Round";
import ScoreAgainstParTotals from "./components/ScoreAgainstParTotals/ScoreAgainstParTotals";
import StatsByHole from "./components/StatsByHole/StatsByHole";


function App() {
    const rounds = Object.assign([], getTransformedRounds());

    return (
        <div className="App">
            <header className="app-header">
                <h1>Golf at Downingtown</h1>
            </header>

            <div className={"app-body"}>
                <p>Holes birdied: {getTheHolesBirdied().join(',')}</p>
                <p>Holes eagled: {getTheHolesEagled().join(',')}</p>
                <StatsByHole/>
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {/*<p>*/}
                {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
                {/*</p>*/}
                <ScoreAgainstParTotals/>
                {rounds.map(round => (
                    <Round roundData={round}/>
                ))}
            </div>
        </div>
    );
}

export default App;
