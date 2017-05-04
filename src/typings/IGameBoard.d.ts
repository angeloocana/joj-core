import { IBoardOptions } from './IBoardOptions';
import { IBoardPosition } from './IBoardPosition';
import { IGamePiece } from './IGamePiece';
import { IPositionsWhereCanIGo } from './IPositionsWhereCanIGo';

export interface IGameBoard {
    board: IBoardPosition[][];
    boardOptions: IBoardOptions;
    logMove: boolean;

    fillPiecesOnBoard(pieces: IGamePiece[]): void;

    generateBoard();
    fillAllPiecesOnBoard(whitePieces: IGamePiece[], blackPieces: IGamePiece[]);
    boardHasThisPosition(position: IBoardPosition): boolean;
    getPosition(position: IBoardPosition): IBoardPosition;
    getNearPositions(position, onlyEmpty): IBoardPosition[];
    getJumpPosition(startPosition: IBoardPosition, toJumpPosition: IBoardPosition): IBoardPosition;

    // tslint:disable-next-line:max-line-length
    whereCanIJump(jumpStartPosition: IBoardPosition, positions, orderedPositions: IBoardPosition[][], isBlack: boolean): void;

    getPositionsWhereCanIGo(startPosition: IBoardPosition, isBlack: boolean): IPositionsWhereCanIGo;
    setWhereCanIGo(startPosition: IBoardPosition, blackPiece: boolean): void;
    cleanBoardWhereCanIGo(): void;
    move(startPosition: IBoardPosition, nextPosition: IBoardPosition, backMove?: boolean, whiteTurn?: boolean): void;
    printUnicode(): string;
}

export interface IGameBoardArgs {
    boardOptions?: IBoardOptions;
    whitePieces?: IGamePiece[];
    blackPieces?: IGamePiece[];
    logMove?: boolean;
}
