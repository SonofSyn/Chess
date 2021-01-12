import { BoardHash, Movement, PossibleMove } from "../../types/interfaces";
import { Position, Player } from "../../types/type";


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

export let checkMove = (posMove: Position[], move: Position): boolean => {
    let back = false
    posMove.forEach(pos => {
        if (pos.x === move.x && pos.y === move.y) back = true
    })
    return back
}