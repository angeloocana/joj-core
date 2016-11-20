declare module "joj-core" {
    let Game: IGame;
    let GameBoard: IGameBoard;
    let GameColor: IGameColor;
    let GamePiece: IGamePiece;
    let GamePieceType: IGamePieceType;
    let Player: IPlayer;
    let Players: IPlayers;
    let BoardHelper: IBoardHelper;
    let PieceHelper: IPieceHelper;

    export {
        Game,
        GameBoard,
        GameColor,
        GamePiece,
        GamePieceType,
        Player,
        Players,
        BoardHelper,
        PieceHelper
    }
}