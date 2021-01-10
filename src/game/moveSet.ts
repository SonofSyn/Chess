import { isBlockedBy, isOnBoard, determinPossibleMove } from "../tools/tools"
import { BoardHash, PossibleMove, MoveTemplate } from "../types/interfaces"
import { Position } from "../types/type"

export let checkMoveDirection = (pos: Position, board: BoardHash, start: number, limit: number, xFactor: number, yFactor: number) => {
    let back: Position[] = []
    for (let i = start; i <= limit; i++) {
        let temp: PossibleMove = determinPossibleMove(pos, { x: i * xFactor, y: i * yFactor }, board)
        if (temp.pos !== null) back.push(temp.pos)
        if (temp.lastPossiblePos) break
    }
    return back
}

export const MoveSet: MoveTemplate = {
    "Bauer": (pos, board) => {
        let back: Position[] = []
        let moveDirUp = board[pos.x + "" + pos.y].player === "weiß" ? true : false
        for (let x = -1; x <= 1; x++) {
            //up 2 steps
            if (x == 0 && pos.y === 2 && moveDirUp) {
                if ((isBlockedBy({ x: pos.x, y: pos.y + 1 }, board) === "") && (isBlockedBy({ x: pos.x, y: pos.y + 2 }, board) === "")) back.push({ x: pos.x, y: pos.y + 2 })
            }
            //down 2 steps
            else if (x == 0 && pos.y === 7 && !moveDirUp) {
                if ((isBlockedBy({ x: pos.x, y: pos.y - 1 }, board) === "") && (isBlockedBy({ x: pos.x, y: pos.y - 2 }, board) === "")) back.push({ x: pos.x, y: pos.y - 2 })
            }
            //up/down 1 step
            if (x == 0) {
                if (isBlockedBy({ x: pos.x, y: pos.y + (moveDirUp ? 1 : -1) }, board) === "") back.push({ x: pos.x, y: pos.y + (moveDirUp ? 1 : -1) })
            }
            //attack diagonal 
            else {
                if (isOnBoard({ x: pos.x + x, y: pos.y + (moveDirUp ? 1 : -1) })) {
                    if (isBlockedBy({ x: pos.x + x, y: pos.y + (moveDirUp ? 1 : -1) }, board) !== "") {
                        let temp: PossibleMove = determinPossibleMove(pos, { x: x, y: moveDirUp ? 1 : -1 }, board)
                        if (temp.pos !== null) back.push(temp.pos)
                    }
                }
            }
        }
        return back
    },
    "Turm": (pos, board) => {
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
    },
    "Springer": (pos, board) => {
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
    },
    "Läufer": (pos, board) => {
        let back: Position[] = []

        back = back.concat(
            //upRight
            checkMoveDirection(pos, board, 1, 8 - pos.y, 1, 1),
            //upLeft
            checkMoveDirection(pos, board, 1, 8 - pos.y, -1, 1),
            //downLeft
            checkMoveDirection(pos, board, 1, pos.x - 1, -1, -1),
            //downRight
            checkMoveDirection(pos, board, 1, pos.x - 1, 1, -1)
        )
        return back
    },
    "Königin": (pos, board) => {
        let back: Position[] = []
        back = back.concat(
            //up
            checkMoveDirection(pos, board, 1, 8 - pos.y, 0, 1),
            //down
            checkMoveDirection(pos, board, 1, pos.y - 1, 0, -1),
            //left
            checkMoveDirection(pos, board, 1, pos.x - 1, -1, 0),
            //right
            checkMoveDirection(pos, board, 1, 8 - pos.x, 1, 0),
            //upRight
            checkMoveDirection(pos, board, 1, 8 - pos.y, 1, 1),
            //upLeft
            checkMoveDirection(pos, board, 1, 8 - pos.y, -1, 1),
            //downLeft
            checkMoveDirection(pos, board, 1, pos.x - 1, -1, -1),
            //downRight
            checkMoveDirection(pos, board, 1, pos.x - 1, 1, -1)
        )
        return back
    },
    "König": (pos, board) => {
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
    },
}