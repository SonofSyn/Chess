import { forEachAsync } from "../../async"
import { axis } from "../../types/const"
import { BoardHash, Game, Movement } from "../../types/interfaces"
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

export let displayPossibleMoves = async (game: Game, pos: Position): Promise<{ display: string[][]; moves: Position[] }> => {
    let moves: Position[] = (await determinPossibleMoves(pos, game.history.movementLog, game.gameBoard)).pos
    let display = await displayBoard(game.gameBoard)
    await forEachAsync(moves, async move => {
        let flag = false
        let backup = await doMove(game, game.gameBoard[(await buildKey(pos))], game.gameBoard[(await buildKey(move))])
        let check = await kingInCheck(game, game.gameBoard[(await buildKey(move))].player)
        if (check.length > 0) {
            flag = true
        }
        await undoMove(game.gameBoard[(await buildKey(pos))], game.gameBoard[(await buildKey(move))], backup)
        if (!flag) display[8 - move.y][move.x] = "XXXX"

    })

    return { display, moves }
}