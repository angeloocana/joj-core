interface IPlayer {
    name: string;
    color: string;
    getMove?:(game:IGame)=>IMove;
    isComputer:()=>boolean;
}
