import { BoardHash, PossibleMove } from "../../../types/interfaces"
import { Position } from "../../../types/type"
import { determinPossibleMove } from "../determinPossibleMoves"

export let knight = (pos: Position, board: BoardHash)=>{
    let back: Position[] = []
    for (let i = -2; i <= 2; i++) {
        if (i !== 0) {
            let temp: PossibleMove = determinPossibleMove(pos, { x: i, y: Math.abs(i) === 2 ? 1 : 2 }, board)
            if (temp.pos !== null) back.push(temp.pos)
            temp = determinPossibleMove(pos, { x: i, y: Math.abs(i) === 2 ? -1 : -2 }, board)
            if (temp.pos !== null) back.push(temp.pos)
        }
    }
    return back
}