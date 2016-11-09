/**
 * Clean Game To Save on Server
 */
interface ICleanGame {
    ended: boolean,
    movements: IMove[],
    blackWin: boolean
}
