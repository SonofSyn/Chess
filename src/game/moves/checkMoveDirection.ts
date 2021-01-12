import { determinPossibleMove } from "./determinPossibleMoves"
import { BoardHash, PossibleMove } from "../../types/interfaces"
import { Position } from "../../types/type"

export let checkMoveDirection = (pos: Position, board: BoardHash, start: number, limit: number, xFactor: number, yFactor: number) => {
    let back: Position[] = []
    for (let i = start; i <= limit; i++) {
        let temp: PossibleMove = determinPossibleMove(pos, { x: i * xFactor, y: i * yFactor }, board)
        if (temp.pos !== null) back.push(temp.pos)
        if (temp.lastPossiblePos) break
    }
    return back
}