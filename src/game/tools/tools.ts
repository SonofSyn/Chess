import { BoardHash} from "../../types/interfaces";
import { Position, Player } from "../../types/type";


/**
 * Checks if coordinates are on the gameboard
 *
 * @param {Position} pos
 * @return {*}  {boolean}
 */
export let isOnBoard = async (pos: Position): Promise<boolean> => {
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
export let isBlockedBy = async (pos: Position, board: BoardHash): Promise<Player> => board[await buildKey(pos)].player

export let checkMove = async (posMove: Position[], move: Position): Promise<boolean> => {
    let back = false
    posMove.forEach(pos => {
        //  checks if move in contained in array
        if (pos.x === move.x && pos.y === move.y) back = true
    })
    return back
}

export let buildKey = async (pos: Position): Promise<string> => pos.x + "" + pos.y