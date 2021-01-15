import { BoardHash } from "../../../types/interfaces"
import { Position } from "../../../types/type"
import { checkMoveDirection } from "../checkMoveDirection"

export let bishop = async (pos: Position, board: BoardHash)=>{
    let back: Position[] = []

    back = back.concat(
        //upRight
        await checkMoveDirection(pos, board, 1, 8 - pos.y, 1, 1),
        //upLeft
        await checkMoveDirection(pos, board, 1, 8 - pos.y, -1, 1),
        //downLeft
        await checkMoveDirection(pos, board, 1, pos.y - 1, -1, -1),
        //downRight
        await checkMoveDirection(pos, board, 1, pos.y - 1, 1, -1)
    )
    return back
}