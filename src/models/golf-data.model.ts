export type RoundData = {
    month: number;
    day: number;
    scoresByHole: number[];
    scoreOffsetsByHole?: number[];
    frontNine?: number;
    backNine?: number;
    roundTotal?: number;
}