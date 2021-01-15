import { BoardHash, PossibleMove } from "../../../types/interfaces"
import { Position } from "../../../types/type"
import { determinPossibleMove } from "../determinPossibleMoves"
/**
 * All Positions a knight game piece can make on a given position and gameboard
 *
 * @param {Position} pos
 * @param {BoardHash} board
 * @return {*}  {Promise<Position[]>}
 */
export let knight = async (pos: Position, board: BoardHash):Promise<Position[]>=>{
    let back: Position[] = []
    for (let i = -2; i <= 2; i++) {
        if (i !== 0) {
            let temp: PossibleMove = await determinPossibleMove(pos, { x: i, y: Math.abs(i) === 2 ? 1 : 2 }, board)
            if (temp.pos !== null) back.push(temp.pos)
            temp = await determinPossibleMove(pos, { x: i, y: Math.abs(i) === 2 ? -1 : -2 }, board)
            if (temp.pos !== null) back.push(temp.pos)
        }
    }
    return back
}