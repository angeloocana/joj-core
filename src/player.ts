export default class Player implements IPlayer {
    name: string;
    /**
     * Fill color whith GamePieceType .white or .black
     */
    color: string;
    foto?: string;
    getMove?: (game: IGame) => IMove;

    constructor(args:IPlayerArgs) {
        this.getMove = args.getMove;
        this.name = args.name;
        this.foto = args.foto;
    }

    isComputer(): boolean {
        if (this.getMove)
            return true;
        else
            return false;
    }
}
