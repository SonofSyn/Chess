import { BoardHash } from "../../../types/interfaces";
import { Position } from "../../../types/type";
import { checkMoveDirection } from "../checkMoveDirection"

export let tower = (pos: Position, board: BoardHash)=>{
    let back: Position[] = []
    back = back.concat(
        //up
        checkMoveDirection(pos, board, 1, 8 - pos.y, 0, 1),
        //down
        checkMoveDirection(pos, board, 1, pos.y - 1, 0, -1),
        //left
        checkMoveDirection(pos, board, 1, pos.x - 1, -1, 0),
        //right
        checkMoveDirection(pos, board, 1, 8 - pos.x, 1, 0)
    )
    return back
}