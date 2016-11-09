export default class Players implements IPlayers {
    white: IPlayer;
    black: IPlayer;
    vsComputer: boolean;
    computerIsWhite: boolean;

    constructor() {
        this.white.color = "WHITE";
        this.black.color = "BLACK";
    }
}
