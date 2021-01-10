import { determinPossibleMoves } from "./tools"
import { axis } from "../types/const"
import { BoardHash } from "../types/interfaces"
import { Position } from "../types/type"

/**
 * Displays current board state as string array
 *
 * @param {Chessboard} chessBoard
 * @return {*}  {string[][]}
 */
export let displayBoard = (chessBoard: BoardHash): string[][] => {
    let display: string[][] = []
    let temp: string[] = []
    let index: number = 1
    axis.forEach(y => {
        temp.push(index + "")
        index++
        axis.forEach(x => {
            let figure = chessBoard[x + "" + y].content === null ? "  " : chessBoard[x + "" + y].content!.slice(0, 1)
            if (chessBoard[x + "" + y].content === "Königin") figure = "Q"
            let color = (chessBoard[x + "" + y].content !== null ? "[" + chessBoard[x + "" + y].player[0] + "]" : "  ")
            temp.push(figure + color)
        })
        display.push(temp)
        temp = []
    })
    display.reverse()
    let xLabel: string[] = axis.map(label => " " + String.fromCharCode(64 + label) + "  ")
    display.push([" "].concat(xLabel))
    return display
}

export let displayPossibleMoves = (chessBoard: BoardHash, pos: Position): { display: string[][], moves: Position[] } => {
    let moves: Position[] = determinPossibleMoves(pos, chessBoard).pos
    let display = displayBoard(chessBoard)
    moves.forEach(move => {
        display[8 - move.y][move.x] = "XXXX"
    })
    return { display, moves }
}