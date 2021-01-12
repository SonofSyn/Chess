import { determinPossibleMove } from "../determinPossibleMoves"
import { BoardHash, PossibleMove } from "../../../types/interfaces"
import { Position } from "../../../types/type"

export let king = (pos: Position, board: BoardHash) => {
    let back: Position[] = []
    for (let i = -1; i <= 1; i++) {
        //left/right
        let temp: PossibleMove = determinPossibleMove(pos, { x: i, y: 0 }, board)
        if (temp.pos !== null) back.push(temp.pos)
        //up/down
        temp = determinPossibleMove(pos, { x: 0, y: i }, board)
        if (temp.pos !== null) back.push(temp.pos)
        //upright/downright
        temp = determinPossibleMove(pos, { x: i, y: i }, board)
        if (temp.pos !== null) back.push(temp.pos)
        //upleft/downleft
        temp = determinPossibleMove(pos, { x: -i, y: i }, board)
        if (temp.pos !== null) back.push(temp.pos)
    }
    return back
}