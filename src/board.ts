import { ChessPiece, determinPossibleMoves, startSet } from "./chessPieces";
export type Player = "weiß" | "schwarz" | ""
export type Position = { x: number, y: number }
export interface BoardHash { [pos: string]: Chessfield }
export interface Chessfield { pos: Position, content: null | ChessPiece, player: Player }
export interface BeatenPieces { white: ChessPiece[], black: ChessPiece[] }

export interface Chessboard {
    size: number,
    xAxis: number[],
    yAxis: number[],
    board: BoardHash,
    history: BeatenPieces
}

const xAxis: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
const yAxis: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

/**
 * Creates a chessboard with start setup
 *
 * @return {*}  {Chessboard}
 */
export let buildBoard = (): Chessboard => {
    let hash: BoardHash = {}
    xAxis.forEach((x, xIx) => {
        yAxis.forEach((y, yIx) => {
            if (yIx === 0 || yIx === 7) {
                hash[x + "" + y] = {
                    pos: { x, y },
                    content: startSet[0][xIx],
                    player: yIx === 0 ? "weiß" : "schwarz"
                }
            }
            else if (yIx === 1 || yIx === 6) {
                hash[x + "" + y] = {
                    pos: { x, y },
                    content: startSet[1][xIx],
                    player: yIx === 1 ? "weiß" : "schwarz"
                }
            }
            else hash[x + "" + y] = { pos: { x, y }, content: null, player: "" }
        })
    })
    return {
        size: xAxis.length * yAxis.length,
        xAxis: xAxis,
        yAxis: yAxis,
        board: hash,
        history: { white: [], black: [] }
    }
}

/**
 * Displays current board state as string array
 *
 * @param {Chessboard} chessBoard
 * @return {*}  {string[][]}
 */
export let displayBoard = (chessBoard: Chessboard): string[][] => {
    let display: string[][] = []
    let temp: string[] = []
    let index: number = 1
    chessBoard.yAxis.forEach(y => {
        temp.push(index + "")
        index++
        chessBoard.xAxis.forEach(x => {
            let figure = chessBoard.board[x + "" + y].content === null ? "  " : chessBoard.board[x + "" + y].content!.slice(0, 1)
            if (chessBoard.board[x + "" + y].content === "Königin") figure = "Q"
            let color = (chessBoard.board[x + "" + y].content !== null ? "[" + chessBoard.board[x + "" + y].player[0] + "]" : "  ")
            temp.push(figure + color)
        })
        display.push(temp)
        temp = []
    })
    display.reverse()
    let xLabel: string[] = chessBoard.xAxis.map(label => " " + String.fromCharCode(64 + label) + "  ")
    display.push([" "].concat(xLabel))
    return display
}

export let displayPossibleMoves = (chessBoard: Chessboard, pos: Position): { display: string[][], moves: Position[] } => {
    let moves: Position[] = determinPossibleMoves(pos, chessBoard.board).pos
    let display = displayBoard(chessBoard)
    moves.forEach(move => {
        display[8 - move.y][move.x] = "XXXX"
    })
    return { display, moves }
}