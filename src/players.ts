export default class Players implements IPlayers {
    white: IPlayer;
    black: IPlayer;
    vsComputer: boolean;
    computerIsWhite: boolean;

    constructor(args:IPlayers = null) {
        this.white.color = "WHITE";
        this.black.color = "BLACK";
    }
}
