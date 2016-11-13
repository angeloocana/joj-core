export default class Player {
    constructor(args) {
        this.getMove = args.getMove;
        this.name = args.name;
        this.foto = args.foto;
    }
    isComputer() {
        if (this.getMove)
            return true;
        else
            return false;
    }
}
//# sourceMappingURL=Player.js.map