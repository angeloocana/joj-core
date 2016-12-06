interface IGamePiece {
    position: IBoardPosition;

    whereCanIGo?: IPositionsWhereCanIGo;
    movimentsToWin?: number[];
} 
