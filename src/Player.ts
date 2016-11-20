export default class Player implements IPlayer {
    name: string;
    /**
     * Fill color whith GamePieceType .white or .black
     */
    color: string;
    foto?: string;
    ai?: IAi;

    constructor(args: IPlayerArgs) {
        this.ai = args.ai;
        this.name = args.name;
        this.foto = args.foto;
    }

    isComputer(): boolean {
        return this.ai ? true : false;
    }
}
