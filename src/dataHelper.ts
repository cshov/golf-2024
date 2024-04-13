import rounds from "./data/scores.json";
import {RoundData} from "./models/golf-data.model";



export function getRoundScores(): number[] {
    const golfData: RoundData[] = [...rounds];
    const scores: number[] = golfData.map(round => round.scoresByHole.reduce((cum: number, cur: number) => {
        return cum + cur
    }, 0));
    return scores;
}

export function bestScoresPerHole(): number[] {
    const golfData: RoundData[] = [...rounds];

    let bestScores: number[] = [];

    golfData.forEach((round) => {

        if (bestScores.length === 0) {
            bestScores = round.scoresByHole;

            // first round was 12 holes. so hafta add dummy data for that round
            const holesAdded = bestScores.length;
            const holesMissing = 18 - holesAdded;

            for (let i = 0; i < holesMissing; i += 1) {
                bestScores.push(99);
            }

        } else {
            round.scoresByHole.forEach((hole, index) => {
                if (hole < bestScores[index]) {
                    bestScores[index] = hole;
                }
            })
        }
    });

    return bestScores;
}

export function getStringsForBestScoresPerHole(): string[] {
    const pars = [4,4,3,4,4,4,4,5,4,4,4,3,5,4,3,5,3,5];

    const bestScores = bestScoresPerHole();


    const strings: string[] = bestScores.map((hole, index) => {
        const par = pars[index];

        const scoreOffset = hole - par;

        switch(scoreOffset) {
            case 0:
                return 'PAR'
            case 1:
                return 'BOGEY';
            case 2:
                return 'DOUBLE BOGEY';
            case 3:
                return 'TRIPLE BOGEY';
            case -1:
                return 'BIRDIE';
            case -2:
                return 'EAGLE';
            case -3:
                return 'ALBATROSS';
            default:
                return "NOT GOOD";
        }
    })
    return strings;


}