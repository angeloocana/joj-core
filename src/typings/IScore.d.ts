export interface IScore {
    ended: boolean;
    white: IColorScore;
    black: IColorScore;
}

export interface IColorScore {
    won: boolean;
    winners: number;
    preWinnersPoints: number;
}
