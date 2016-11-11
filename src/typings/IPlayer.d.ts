interface IPlayer {
    name: string;
    color: string;
    foto?:string;
    getMove?:(game:IGame)=>IMove;
    isComputer:()=>boolean;
}

interface IPlayerArgs {
    name: string;
    foto?:string;
    getMove?:(game:IGame)=>IMove;    
}

