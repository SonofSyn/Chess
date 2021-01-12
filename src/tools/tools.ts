import { BoardHash, Movement, PossibleMove } from "../types/interfaces";
import { MoveSet } from "../game/moveSet";
import { Position, Player } from "../types/type";
import { rochade } from "../game/rules";



/**
 * Checks if coordinates are on the gameboard
 *
 * @param {Position} pos
 * @return {*}  {boolean}
 */
export let isOnBoard = (pos: Position): boolean => {
    if (pos.y < 1 || pos.y > 8 || pos.x < 1 || pos.x > 8) return false
    return true
}

/**
 * Checks by whom the current field is occupied
 *
 * @param {Position} pos
 * @param {BoardHash} board
 * @return {*}  {Color}
 */
export let isBlockedBy = (pos: Position, board: BoardHash): Player => board[pos.x + "" + pos.y].player

/**
 * Returns a possible move
 *
 * @param {Position} pos
 * @param {MovePosition} move
 * @param {BoardHash} board
 * @return {*}  {PossibleMove}
 */
export let determinPossibleMove = (pos: Position, move: Position, board: BoardHash): PossibleMove => {
    let back: Position = { x: pos.x + move.x, y: pos.y + move.y }
    if (isOnBoard(back)) {
        let blockedBy = isBlockedBy(back, board)
        if (blockedBy === "") return { pos: back, lastPossiblePos: false }
        if (blockedBy !== board[pos.x + "" + pos.y].player) return { pos: back, lastPossiblePos: true }
        else return { pos: null, lastPossiblePos: true }
    }
    else return { pos: null, lastPossiblePos: true }
}
/**
 * Determines all possible moves a gamepiece can make at a certain position
 *
 * @param {ChessPiece} type
 * @param {boolean} moveDirUp
 * @param {Position} pos
 * @param {BoardHash} board
 * @return {*}  {Position[]}
 */
export let determinPossibleMoves = (pos: Position, log: Movement[], board: BoardHash): { pieceType: string, pos: Position[] } => {
    let type = board[pos.x + "" + pos.y].content

    if (type !== null) {
        let moves = MoveSet[type](pos, board)
        let extraMoves = rochade(board, log, pos)
        moves = moves.concat(extraMoves)
        return { pieceType: type, pos: moves }
    }
    throw new Error("Die Position enthält keine Figur")
}

export let checkMove = (posMove: Position[], move: Position): boolean => {
    let back = false
    posMove.forEach(pos => {
        if (pos.x === move.x && pos.y === move.y) back = true
    })
    return back
}