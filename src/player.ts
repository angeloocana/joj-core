export default class Player implements IPlayer {
    name: string;
    /**
     * Fill color whith GamePieceType .white or .black
     */
    color: string;
    getMove?: (game: IGame) => IMove;

    constructor(name: string, getMove?: (game: IGame) => IMove) {
        this.getMove = getMove;
        this.name = name;
    }

    isComputer(): boolean {
        if (this.getMove)
            return true;
        else
            return false;
    }
}
