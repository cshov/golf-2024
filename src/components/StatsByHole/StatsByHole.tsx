import {bestScoresPerHole, getAverageScoresPerHole, getPars, getStandardDeviationsPerHole} from "../../dataHelper";
import "./StatsByHole.css";

function StatsByHole() {

    const avgScoresPerHole = getAverageScoresPerHole();
    const standardDevs = getStandardDeviationsPerHole();
    const bestScores = [...bestScoresPerHole()];
    const pars = getPars();

    return (
        <div className={"stat-table-container"}>





            <table>
                <tr>
                    <th>Hole #</th>
                    <th>Par</th>
                    <th>Avg Score</th>
                    <th>Avg Score To Par</th>
                    <th>Best Score</th>
                    <th>Std Dev</th>
                </tr>

                {avgScoresPerHole.map((avg, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{pars[index]}</td>
                        <td>{avg}</td>
                        <td>{(avg - pars[index]).toPrecision(2)}</td>
                        <td>{bestScores[index]}</td>
                        <td>{standardDevs[index]}</td>
                    </tr>
                ))}


            </table>




        </div>
    );

}
export default StatsByHole;