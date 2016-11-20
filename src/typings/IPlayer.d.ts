interface IPlayer {
    name: string;
    color: string;
    foto?:string;
    ai?:IAi;
    isComputer:()=>boolean;
}

interface IPlayerArgs {
    name: string;
    foto?:string;
    ai?:IAi;    
}

