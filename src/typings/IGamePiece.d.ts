interface IGamePiece {
    x: number;
    y: number;

    whereCanIGo?: IPositionsWhereCanIGo;
    movimentsToWin?: number[];
} 
