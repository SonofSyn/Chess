import { isBlockedBy, isOnBoard } from "../../tools/tools"
import { BoardHash, MoveTemplate, PossibleMove } from "../../../types/interfaces"
import { Position } from "../../../types/type"
import { determinPossibleMove } from "../determinPossibleMoves"


export let pawn = async (pos: Position, board: BoardHash) => {
    let back: Position[] = []
    let moveDirUp = board[pos.x + "" + pos.y].player === "weiß" ? true : false
    for (let x = -1; x <= 1; x++) {
        //up 2 steps
        if (x == 0 && pos.y === 2 && moveDirUp) {
            if ((await isBlockedBy({ x: pos.x, y: pos.y + 1 }, board) === "") && (await isBlockedBy({ x: pos.x, y: pos.y + 2 }, board) === ""))
                back.push({ x: pos.x, y: pos.y + 2 })
        }

        //down 2 steps
        else if (x == 0 && pos.y === 7 && !moveDirUp) {
            if ((await isBlockedBy({ x: pos.x, y: pos.y - 1 }, board) === "") && (await isBlockedBy({ x: pos.x, y: pos.y - 2 }, board) === ""))
                back.push({ x: pos.x, y: pos.y - 2 })
        }
        //up/down 1 step
        if (x == 0) {
            if (await isBlockedBy({ x: pos.x, y: pos.y + (moveDirUp ? 1 : -1) }, board) === "")
                back.push({ x: pos.x, y: pos.y + (moveDirUp ? 1 : -1) })
        }

        //attack diagonal 
        else {
            if (await isOnBoard({ x: pos.x + x, y: pos.y + (moveDirUp ? 1 : -1) })) {
                if (await isBlockedBy({ x: pos.x + x, y: pos.y + (moveDirUp ? 1 : -1) }, board) !== "") {
                    let temp: PossibleMove = await determinPossibleMove(pos, { x: x, y: moveDirUp ? 1 : -1 }, board)
                    if (temp.pos !== null)
                        back.push(temp.pos)
                }
            }
        }
    }
    return back
}