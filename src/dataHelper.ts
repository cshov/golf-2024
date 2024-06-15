import rounds from "./data/scores.json";
import {RoundData} from "./models/golf-data.model";

export function getRounds(): RoundData[] {
    return Object.assign([], rounds);
}

export function getTransformedRounds(): RoundData[] {
    const roundsOG = [...getRounds()];

    return roundsOG.map(round => {
        const frontNine = [...round.scoresByHole].slice(0,9).reduce((acc,cur) => {
            return acc + cur;
        });
        const backNine = [...round.scoresByHole].slice(9,18).reduce((acc,cur) => {
            return acc + cur;
        });

        return {
            ...round,
            scoreOffsetsByHole: getScoreOffsetsForRound(round),
            frontNine,
            backNine,
            roundTotal: frontNine + backNine
        };
    })
}

export function getRoundScores(): number[] {
    const golfData: RoundData[] = [...rounds];
    return golfData.map(round => round.scoresByHole.reduce((cum: number, cur: number) => {
        return cum + cur
    }, 0));
}

export function bestScoresPerHole(): number[] {
    const golfData: RoundData[] = [...getRounds()];
    let bestScores: number[] = [99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99];

    golfData.forEach((round) => {
        const clonedRound = Object.assign({}, round);
        clonedRound.scoresByHole.forEach((hole, index) => {
            if (hole && hole < bestScores[index]) {
                bestScores[index] = hole;
            }
        })
    });

    return bestScores;
}

export function getTheHolesBirdied(): number[] {
    const rounds = getTransformedRounds();

    const arrayOfHolesBirdiedWithDupes: number[] = [];

    rounds.forEach((round) => {
        round.scoreOffsetsByHole?.forEach((offset, index) => {
            if (offset === -1) {
                arrayOfHolesBirdiedWithDupes.push(index+1);
            }
        })
    });

    return Array.from(new Set(arrayOfHolesBirdiedWithDupes)).sort((a,b) => a-b);
}

export function getTheHolesEagled(): number[] {
    const rounds = getTransformedRounds();

    const arrayOfHolesBirdiedWithDupes: number[] = [];

    rounds.forEach((round) => {
        round.scoreOffsetsByHole?.forEach((offset, index) => {
            if (offset === -2) {
                arrayOfHolesBirdiedWithDupes.push(index+1);
            }
        })
    });

    return Array.from(new Set(arrayOfHolesBirdiedWithDupes)).sort((a,b) => a-b);
}

export function getStringsForBestScoresPerHole(): string[] {
    const pars = getPars();
    const bestScores = bestScoresPerHole();

    return bestScores.map((hole, index) => {
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
    });
}

export function getNumberOfEaglesTotal(): number {
    return getNumberOfScoresTotalByOffset(-2);
}

export function getNumberOfBirdiesTotal(): number {
    return getNumberOfScoresTotalByOffset(-1);
}

export function getNumberOfParsTotal(): number {
    return getNumberOfScoresTotalByOffset(0);
}

export function getNumberOfBogeysTotal(): number {
    return getNumberOfScoresTotalByOffset(1);
}

export function getNumberOfDoubleBogeysTotal(): number {
    return getNumberOfScoresTotalByOffset(2);
}

export function getNumberOfTripleBogeysTotal(): number {
    return getNumberOfScoresTotalByOffset(3);
}

export function getNumberOfQuadBogeysTotal(): number {
    return getNumberOfScoresTotalByOffset(4);
}

export function getNumberOfScoresTotalByOffset(specifiedOffset: number): number {
    const rounds = getTransformedRounds();

    return rounds.reduce((acc, cur) => {
        const num = cur.scoreOffsetsByHole?.filter(offset => offset === specifiedOffset).length;

        return acc + (num || 0);
    }, 0);
}

export function getScoreName(score: number, holeNum: number): string {
    const pars = getPars();
    const par = pars[holeNum];
    const scoreOffset = score - par;

    switch(scoreOffset) {
        case 0:
            return 'par'
        case 1:
            return 'bogey';
        case 2:
            return 'double';
        case 3:
            return 'triple';
        case -1:
            return 'birdie';
        case -2:
            return 'eagle';
        case -3:
            return 'albatross';
        default:
            return "shit";
    }
}

export function getScoreOffsetsForRound(round: RoundData): number[] {
    const pars = getPars();
    return round.scoresByHole.map((hole, index) => {
        const par = pars[index];

        return hole - par;
    });
}

export function getAverageScoresPerHole(): number[] {
    const rounds = [...getTransformedRounds()];

    const holesAndScoresArray: number[][] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    rounds.forEach((round) => {
        round.scoresByHole?.forEach((score, index) => {
            holesAndScoresArray[index].push(score);
        })
    });

    return holesAndScoresArray.map(arrayOfScores => getAverageScore(arrayOfScores));
}

export function getStandardDeviationsPerHole(): number[] {
    const rounds = [...getTransformedRounds()];

    const holesAndScoresArray: number[][] = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    rounds.forEach((round) => {
        round.scoreOffsetsByHole?.forEach((offset, index) => {
            holesAndScoresArray[index].push(offset);
        })
    });

    return holesAndScoresArray.map(arrayOfScores => getStandardDeviation(arrayOfScores));
}

export function getStandardDeviation(numbers: number[]): number {
    const n = numbers.length;
    const mean = numbers.reduce((a, b) => a + b) / n;
    return Math.round(Math.sqrt(numbers.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n) * 100) / 100
}

export function getAverageScore(numbers: number[]): number {
    const n = numbers.length;
    return +(numbers.reduce((a, b) => a + b) / n).toPrecision(2);
}

export function getStringsForScoresForRound(round: RoundData): string[] {
    const pars = getPars();
    return round.scoresByHole.map((hole, index) => {
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
    });
}

export function getPars(): number[] {
    return [4,4,3,4,4,4,4,5,4,4,4,3,5,4,3,5,3,5];
}