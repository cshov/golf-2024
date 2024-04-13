import {bestScoresPerHole, getAverageScoresPerHole, getStandardDeviationsPerHole} from "../../dataHelper";
import "./StatsByHole.css";

function StatsByHole() {

    const avgScoresPerHole = getAverageScoresPerHole();
    const standardDevs = getStandardDeviationsPerHole();
    const bestScores = bestScoresPerHole();

    return (
        <div className={"stat-table-container"}>





            <table>
                <tr>
                    <th>Hole #</th>
                    <th>Avg Score</th>
                    <th>Best Score</th>
                    <th>Std Dev</th>
                </tr>

                {avgScoresPerHole.map((avg, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{avg}</td>
                        <td>{bestScores[index]}</td>
                        <td>{standardDevs[index]}</td>
                    </tr>
                ))}





            </table>




        </div>
    );

}
export default StatsByHole;