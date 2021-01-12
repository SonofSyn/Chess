import { isBlockedBy, isOnBoard } from "../../tools/tools"
import { BoardHash, MoveTemplate, PossibleMove } from "../../../types/interfaces"
import { Position } from "../../../types/type"
import { determinPossibleMove } from "../determinPossibleMoves"


export let pawn = (pos: Position, board: BoardHash) => {
    let back: Position[] = []
    let moveDirUp = board[pos.x + "" + pos.y].player === "weiß" ? true : false
    for (let x = -1; x <= 1; x++) {
        //up 2 steps
        if (x == 0 && pos.y === 2 && moveDirUp) {
            if ((isBlockedBy({ x: pos.x, y: pos.y + 1 }, board) === "") && (isBlockedBy({ x: pos.x, y: pos.y + 2 }, board) === ""))
                back.push({ x: pos.x, y: pos.y + 2 })
        }

        //down 2 steps
        else if (x == 0 && pos.y === 7 && !moveDirUp) {
            if ((isBlockedBy({ x: pos.x, y: pos.y - 1 }, board) === "") && (isBlockedBy({ x: pos.x, y: pos.y - 2 }, board) === ""))
                back.push({ x: pos.x, y: pos.y - 2 })
        }
        //up/down 1 step
        if (x == 0) {
            if (isBlockedBy({ x: pos.x, y: pos.y + (moveDirUp ? 1 : -1) }, board) === "")
                back.push({ x: pos.x, y: pos.y + (moveDirUp ? 1 : -1) })
        }

        //attack diagonal 
        else {
            if (isOnBoard({ x: pos.x + x, y: pos.y + (moveDirUp ? 1 : -1) })) {
                if (isBlockedBy({ x: pos.x + x, y: pos.y + (moveDirUp ? 1 : -1) }, board) !== "") {
                    let temp: PossibleMove = determinPossibleMove(pos, { x: x, y: moveDirUp ? 1 : -1 }, board)
                    if (temp.pos !== null)
                        back.push(temp.pos)
                }
            }
        }
    }
    return back
}