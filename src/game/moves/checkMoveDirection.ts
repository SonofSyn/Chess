import { determinPossibleMove } from "./determinPossibleMoves"
import { BoardHash, PossibleMove } from "../../types/interfaces"
import { Position } from "../../types/type"
/**
 * Returns all positions in a chosen direction until its blocked
 *
 * @param {Position} pos
 * @param {BoardHash} board
 * @param {number} start
 * @param {number} limit
 * @param {number} xFactor
 * @param {number} yFactor
 * @return {*}  {Promise<Position[]>}
 */
export let checkMoveDirection = async (pos: Position, board: BoardHash, start: number, limit: number, xFactor: number, yFactor: number):Promise<Position[]> => {
    let back: Position[] = []
    for (let i = start; i <= limit; i++) {
        // checks if the next position in line is the end of the line (gameboard/ other piece)
        let temp: PossibleMove = await determinPossibleMove(pos, { x: i * xFactor, y: i * yFactor }, board)
        if (temp.pos !== null) back.push(temp.pos)
        if (temp.lastPossiblePos) break
    }
    return back
}