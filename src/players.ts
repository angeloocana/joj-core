import Player from "./player";

export default class Players implements IPlayers {
    white: IPlayer;
    black: IPlayer;
    vsComputer: boolean;
    computerIsWhite: boolean;

    constructor(args:IPlayersArgs = null) {
        if(!args) args = {};

        this.white = args.white || new Player("Computer", true);
        this.black = args.black || new Player("Black Player", false); 

        this.white.color = "WHITE";
        this.black.color = "BLACK";
    }
}
