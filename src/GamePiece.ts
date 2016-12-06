import BoardPosition from "./BoardPosition";

export default class GamePiece implements IGamePiece{
    position: IBoardPosition;

    whereCanIGo?: IPositionsWhereCanIGo;
    movimentsToWin?: number[];

    constructor(x:number, y:number, isBlack:boolean){
        this.position = new BoardPosition({x,y});
        this.position.setPiece(isBlack);
    }
}