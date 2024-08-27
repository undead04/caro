export interface settingGameState{
    caro:string,
    timeTurn:number,
    timePeople:number,
    start:number,
    mode:number
}
export interface IBoard {
    grid: number[][]; // 0: ô trống, 1: quân của người chơi 1, -1: quân của người chơi 2
}

export interface Move {
    row: number;
    col: number;
}