import {RoundData} from "../../models/golf-data.model";
import {getScoreName, getStringsForScoresForRound} from "../../dataHelper";
import './Round.css';

function Round(props: {roundData: RoundData}) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const scoreStrings = getStringsForScoresForRound(props.roundData);

    // console.log(props.roundData.scoresByHole)

    return (
        <div className="round-container">
            <h2>{months[props.roundData.month]} {props.roundData.day}</h2>
            {/*<p>{scoreStrings.join(',')}</p>*/}
            <div className="score-grid">


                {props.roundData.scoresByHole.slice(0, 9).map((hole, index) => (
                    <div className={"hole-info"}>
                        <span className={"hole-number"}>{index + 1}</span>
                        <span className={`hole-score ${getScoreName(hole, index)}`}>{hole}</span>
                    </div>
                ))}


                <div className={"front-nine"}>
                    <span className={"hole-number"}>OUT</span>
                    <span className={`hole-score`}>{props.roundData.frontNine}</span>
                </div>


                {props.roundData.scoresByHole.slice(9, 18).map((hole, index) => (
                    <div className={"hole-info"}>
                        <span className={"hole-number"}>{index + 10}</span>
                        <span className={`hole-score ${getScoreName(hole, index+9)}`}>{hole}</span>
                    </div>
                ))}
                <div className={"back-nine"}>
                    <span className={"hole-number"}>IN</span>
                    <span className={`hole-score`}>{props.roundData.backNine}</span>
                </div>

                <div className={"total"}>
                    <span className={"hole-number"}>TOT</span>
                    <span className={`hole-score`}>{props.roundData.roundTotal}</span>
                </div>

            </div>


        </div>

    )
}

export default Round;