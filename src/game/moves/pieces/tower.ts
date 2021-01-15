import { BoardHash } from "../../../types/interfaces";
import { Position } from "../../../types/type";
import { checkMoveDirection } from "../checkMoveDirection"
/**
 * All Positions a tower game piece can make on a given position and gameboard
 *
 * @param {Position} pos
 * @param {BoardHash} board
 * @return {*}  {Promise<Position[]>}
 */
export let tower = async (pos: Position, board: BoardHash):Promise<Position[]>=>{
    let back: Position[] = []
    back = back.concat(
        //up
        await checkMoveDirection(pos, board, 1, 8 - pos.y, 0, 1),
        //down
        await checkMoveDirection(pos, board, 1, pos.y - 1, 0, -1),
        //left
        await checkMoveDirection(pos, board, 1, pos.x - 1, -1, 0),
        //right
        await checkMoveDirection(pos, board, 1, 8 - pos.x, 1, 0)
    )
    return back
}