import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    bestScoresPerHole, getAverageScore, getAverageScoresPerHole,
    getNumberOfBirdiesTotal,
    getNumberOfBogeysTotal,
    getNumberOfDoubleBogeysTotal, getNumberOfEaglesTotal,
    getNumberOfParsTotal, getNumberOfQuadBogeysTotal, getNumberOfTripleBogeysTotal,
    getRounds,
    getRoundScores, getStandardDeviationsPerHole,
    getStringsForBestScoresPerHole, getTheHolesBirdied,
    getTransformedRounds
} from "./dataHelper"
import Round from "./components/Round/Round";
import ScoreAgainstParTotals from "./components/ScoreAgainstParTotals/ScoreAgainstParTotals";
import StatsByHole from "./components/StatsByHole/StatsByHole";




function App() {

    const rounds = getTransformedRounds();
    console.log('rounds', rounds)

  return (
    <div className="App">
        <header className="app-header">
            <h1>Golf at Downingtown</h1>


        </header>

        <div className={"app-body"}>

            <p>Holes birdied: {getTheHolesBirdied().join(',')}</p>


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
