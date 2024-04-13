import {
    getNumberOfBirdiesTotal,
    getNumberOfBogeysTotal, getNumberOfDoubleBogeysTotal,
    getNumberOfEaglesTotal,
    getNumberOfParsTotal, getNumberOfQuadBogeysTotal, getNumberOfTripleBogeysTotal
} from "../../dataHelper";
import './ScoreAgainstParTotals.css';
import React from "react";


function ScoreAgainstParTotals() {

    return (
        <div className={"table-wrapper"}>

            <table className={"offset-totals"}>
                <tbody>
                <tr>
                    <th>Eagles</th>
                    <td>{getNumberOfEaglesTotal()}</td>
                </tr>
                <tr>
                    <th>Birdies</th>
                    <td>{getNumberOfBirdiesTotal()}</td>
                </tr>
                <tr>
                    <th>Pars</th>
                    <td>{getNumberOfParsTotal()}</td>
                </tr>
                <tr>
                    <th>Bogeys</th>
                    <td>{getNumberOfBogeysTotal()}</td>
                </tr>
                <tr>
                    <th>Double Bogeys</th>
                    <td>{getNumberOfDoubleBogeysTotal()}</td>
                </tr>
                <tr>
                    <th>Triple Bogeys</th>
                    <td>{getNumberOfTripleBogeysTotal()}</td>
                </tr>
                <tr>
                    <th>Quad Bogeys</th>
                    <td>{getNumberOfQuadBogeysTotal()}</td>
                </tr>
                </tbody>

            </table>

        </div>
    );

}

export default ScoreAgainstParTotals;