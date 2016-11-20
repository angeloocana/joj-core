/// <reference path="IGamePieceType.d.ts" />
/// <reference path="IGame.d.ts" />
/// <reference path="IGamePiece.d.ts" />
/// <reference path="IMove.d.ts" />
/// <reference path="IAi.d.ts" />
/// <reference path="IGamePosition.d.ts" />
/// <reference path="IPlayer.d.ts" />
/// <reference path="IPlayers.d.ts" />
/// <reference path="IGameBoard.d.ts" />
/// <reference path="IGameColor.d.ts" />
/// <reference path="IGameArgs.d.ts" />
/// <reference path="ICleanGame.d.ts" />
/// <reference path="IBoardOptions.d.ts" />
/// <reference path="IPositionsWhereCanIGo.d.ts" />
/// <reference path="IBoardOptions.d.ts" />
/// <reference path="IBoardSize.d.ts" />
/// <reference path="./helpers/IBoardHelper.d.ts" />
/// <reference path="./helpers/IPieceHelper.d.ts" />

declare module jojCore {

    let BoardHelper: IBoardHelper;
    let PieceHelper: IPieceHelper;
    let GamePieceType: IGamePieceType;

    class Game implements IGame {
        constructor(args: IGameArgs);
        ended: boolean;
        movements: IMove[];
        blackWin: boolean;
        players: IPlayers;
        white: IGameColor;
        black: IGameColor;
        board: IGameBoard;

        isWhiteTurn(): boolean;

        getCleanGameToSaveOnServer(): ICleanGame;

        setWhereCanIGo(startPosition): void;
        verifyWinner(): void;
        canMove(startPosition: IGamePosition,
            nextPosition: IGamePosition): boolean;
        move(startPosition: IGamePosition,
            nextPosition: IGamePosition, backMove?: boolean): void;
        backMove(): void;

        getColorTurn(): IGameColor;
        getPlayerTurn(): IPlayer;

        getNewCopy(): IGame;
        getCopy(): IGame;
    }

    class GameBoard implements IGameBoard {
        constructor(args?: IGameBoardArgs);
        board: IGamePosition[][];
        boardOptions: IBoardOptions;

        /**
         * 
         * @piece GamePieceType
         */
        fillPiecesOnBoard(pieces: IGamePosition[], piece: string)
            : void;

        generateBoard();
        fillAllPiecesOnBoard(whitePieces: IGamePiece[], blackPieces: IGamePiece[]);
        boardHasThisPosition(position: IGamePosition): boolean;
        getPosition(position: IGamePosition): IGamePosition;
        isPositionEmpty(position: IGamePosition): boolean;
        getNearPositions(position, onlyEmpty): IGamePosition[];
        getJumpPosition(startPosition: IGamePosition, toJumpPosition: IGamePosition)
            : IGamePosition

        whereCanIJump(jumpStartPosition: IGamePosition, positions,
            orderedPositions: IGamePosition[][], isBlack: boolean): void;

        getPositionsWhereCanIGo(startPosition: IGamePosition,
            isBlack: boolean): IPositionsWhereCanIGo;
        setWhereCanIGo(startPosition: IGamePosition, blackPiece: boolean): void;
        cleanBoardWhereCanIGo(): void;
        move(startPosition: IGamePosition, nextPosition: IGamePosition,
            backMove?: boolean, whiteTurn?: boolean): void
    }

    class GameColor implements IGameColor {
        constructor(boardOptions: IBoardOptions, isBlack: boolean);
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

    class Player implements IPlayer {
        constructor(args: IPlayerArgs);
        name: string;
        color: string;
        foto?: string;
        ai?: IAi;
        isComputer: () => boolean;
    }

    class Players implements IPlayers {
        constructor(args: IPlayers);
        white: IPlayer;
        black: IPlayer;
    }
}

declare module "joj-core"
{
    export = jojCore;
}