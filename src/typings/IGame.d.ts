import { IBoardPosition } from './IBoardPosition';
import { ICleanGame } from './ICleanGame';
import { IGameBoard } from './IGameBoard';

import { IGameColor } from './IGameColor';
import { IPlayer } from './IPlayer';
import { IPlayers } from './IPlayers';

export interface IGame extends ICleanGame {

    players: IPlayers;
    white: IGameColor;
    black: IGameColor;
    board: IGameBoard;

    isWhiteTurn(): boolean;
    setWhereCanIGo(startPosition): void;
    verifyWinner(): void;
    canMove(startPosition: IBoardPosition, nextPosition: IBoardPosition): boolean;
    move(startPosition: IBoardPosition, nextPosition: IBoardPosition, backMove?: boolean): void;
    backMove(): void;

    getColorTurn(): IGameColor;
    getPlayerTurn(): IPlayer;

    getNewCopy(): IGame;
    getCopy(): IGame;
}
