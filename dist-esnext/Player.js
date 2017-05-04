export class Player {
    constructor(args) {
        this.ai = args.ai;
        this.name = args.name;
        this.foto = args.foto;
    }
    isComputer() {
        return this.ai ? true : false;
    }
}
//# sourceMappingURL=Player.js.map