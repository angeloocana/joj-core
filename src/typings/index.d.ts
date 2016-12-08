/// <reference path="IGamePieceType.d.ts" />
/// <reference path="IGame.d.ts" />
/// <reference path="IGamePiece.d.ts" />
/// <reference path="IMove.d.ts" />
/// <reference path="IAi.d.ts" />
/// <reference path="IBoardPosition.d.ts" />
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
        canMove(startPosition: IBoardPosition,
            nextPosition: IBoardPosition): boolean;
        move(startPosition: IBoardPosition,
            nextPosition: IBoardPosition, backMove?: boolean): void;
        backMove(): void;

        getColorTurn(): IGameColor;
        getPlayerTurn(): IPlayer;

        getNewCopy(): IGame;
        getCopy(): IGame;
    }

    class GameBoard implements IGameBoard {
        constructor(args?: IGameBoardArgs);
        board: IBoardPosition[][];
        boardOptions: IBoardOptions;

        fillPiecesOnBoard(pieces: IGamePiece[]): void;

        generateBoard();
        fillAllPiecesOnBoard(whitePieces: IGamePiece[], blackPieces: IGamePiece[]);
        boardHasThisPosition(position: IBoardPosition): boolean;
        getPosition(position: IBoardPosition): IBoardPosition;
        isPositionEmpty(position: IBoardPosition): boolean;
        getNearPositions(position, onlyEmpty): IBoardPosition[];
        getJumpPosition(startPosition: IBoardPosition, toJumpPosition: IBoardPosition)
            : IBoardPosition

        whereCanIJump(jumpStartPosition: IBoardPosition, positions,
            orderedPositions: IBoardPosition[][], isBlack: boolean): void;

        getPositionsWhereCanIGo(startPosition: IBoardPosition,
            isBlack: boolean): IPositionsWhereCanIGo;
        setWhereCanIGo(startPosition: IBoardPosition, blackPiece: boolean): void;
        cleanBoardWhereCanIGo(): void;
        move(startPosition: IBoardPosition, nextPosition: IBoardPosition,
            backMove?: boolean, whiteTurn?: boolean): void;
        printUnicode(): string;
        logMove: boolean;
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
        move(startPosition: IBoardPosition, nextPosition: IBoardPosition)
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

    class BoardPosition implements IBoardPosition {
        x: number;
        y: number;

        setPiece(isBlack: boolean): void;

        lastMoviment?: IMove;

        lastPosition?: IBoardPosition;
        jumpingBlackPiece?: boolean;
        jumps?: number;

        iCanGoHere?: boolean;
        lastMove?: boolean;
        lastMoveJump?: boolean;

        isWhiteHome?: boolean;
        isBlackHome?: boolean;

        move(nextPosition: IBoardPosition): void;
        removePiece(): void;
        isEmpty(): boolean;
        isBlackPiece(): boolean;
        isWhitePiece(): boolean;
        isSamePositionAs(comparePosition: IBoardPosition): boolean;
    }

    class GamePiece implements IGamePiece {
        position: IBoardPosition;

        whereCanIGo?: IPositionsWhereCanIGo;
        movimentsToWin?: number[];
    }
}

declare module "joj-core"
{
    export = jojCore;
}