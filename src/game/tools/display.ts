import { forEachAsync } from "../../async"
import { axis } from "../../types/const"
import { BoardHash, Game } from "../../types/interfaces"
import { Position } from "../../types/type"
import { doMove, undoMove } from "../mechanics/execMove"
import { determinPossibleMoves } from "../moves/determinPossibleMoves"
import { kingInCheck } from "../rules/kingInCheck"
import { buildKey } from "./tools"

/**
 * Displays current board state as string array
 *
 * @param {Chessboard} chessBoard
 * @return {*}  {string[][]}
 */
export let displayBoard = async (chessBoard: BoardHash): Promise<string[][]> => {
    let display: string[][] = []
    let temp: string[] = []
    let index: number = 1
    // goes through y axis
    axis.forEach(y => {
        temp.push(index + "")
        index++
        // goes through x axis
        axis.forEach(x => {
            // saves game piece to be displayed
            let figure = chessBoard[x + "" + y].content === null ? "  " : chessBoard[x + "" + y].content!.slice(0, 1)
            if (chessBoard[x + "" + y].content === "Koenigin") figure = "Q"
            let color = (chessBoard[x + "" + y].content !== null ? "[" + chessBoard[x + "" + y].player[0] + "]" : "  ")
            temp.push(figure + color)
        })
        // saves board
        display.push(temp)
        temp = []
    })
    // rotates 
    display.reverse()
    // adds x axis labels
    let xLabel: string[] = axis.map(label => " " + String.fromCharCode(64 + label) + "  ")
    // adds an empty cell
    display.push([" "].concat(xLabel))
    return display
}
/**
 *
 *
 * @param {Game} game
 * @param {Position} pos
 * @return {*}  {Promise<{ display: string[][]; moves: Position[] }>}
 */
export let displayPossibleMoves = async (game: Game, pos: Position): Promise<{ display: string[][]; moves: Position[] }> => {
    let moves: Position[] = (await determinPossibleMoves(pos, game.history.movementLog, game.gameBoard)).pos
    let display = await displayBoard(game.gameBoard)
    // goes trough all possible moves
    await forEachAsync(moves, async move => {
        // registers move 
        let flag = false
        let backup = await doMove(game, game.gameBoard[(await buildKey(pos))], game.gameBoard[(await buildKey(move))])
        let check = await kingInCheck(game, game.gameBoard[(await buildKey(move))].player)
        // checks the position would be in check rule
        if (check.length > 0) {
            flag = true
        }
        // undo move 
        await undoMove(game.gameBoard[(await buildKey(pos))], game.gameBoard[(await buildKey(move))], backup)
        // show only moves which are not in check rule
        if (!flag) display[8 - move.y][move.x] = "XXXX"

    })

    return { display, moves }
}