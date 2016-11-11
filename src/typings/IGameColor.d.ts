interface IGameColor {
    winners: number;
    jumps: number;
    points: number;
    preWinnersPoints: number;
    nMoves: number;
    startRow: number;
    endRow: number;
    pieces: IGamePiece[];

    setColorWinners(): void;
    win(): boolean;
    move(startPosition: IGamePosition, nextPosition: IGamePosition)
        : void;
}
