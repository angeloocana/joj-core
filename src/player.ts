export default class Player implements IPlayer {
    name: string;
    isComputer: boolean;
    color: string;

    constructor(name:string, isComputer:boolean) {
        this.isComputer = isComputer;
        this.name = name;
    }
}
