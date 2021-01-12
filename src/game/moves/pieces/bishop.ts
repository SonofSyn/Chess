import { BoardHash } from "../../../types/interfaces"
import { Position } from "../../../types/type"
import { checkMoveDirection } from "../checkMoveDirection"

export let bishop = (pos: Position, board: BoardHash)=>{
    let back: Position[] = []

    back = back.concat(
        //upRight
        checkMoveDirection(pos, board, 1, 8 - pos.y, 1, 1),
        //upLeft
        checkMoveDirection(pos, board, 1, 8 - pos.y, -1, 1),
        //downLeft
        checkMoveDirection(pos, board, 1, pos.y - 1, -1, -1),
        //downRight
        checkMoveDirection(pos, board, 1, pos.y - 1, 1, -1)
    )
    return back
}