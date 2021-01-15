import { BoardHash, PossibleMove, Movement } from "../../types/interfaces"
import { Position } from "../../types/type"
import { MoveSet } from "./moveSet"
import { rochade } from "../rules/rochadeRule"
import { isOnBoard, isBlockedBy } from "../tools/tools"

/**
 * Returns a possible move
 *
 * @param {Position} pos
 * @param {MovePosition} move
 * @param {BoardHash} board
 * @return {*}  {PossibleMove}
 */
export let determinPossibleMove = async (pos: Position, move: Position, board: BoardHash): Promise<PossibleMove> => {
    let back: Position = { x: pos.x + move.x, y: pos.y + move.y }
    // checks if the move in on the gameboard
    if (await isOnBoard(back)) {
        // checks if the pos is blocked by a other gamepiec
        let blockedBy = await isBlockedBy(back, board)
        // if empty its possible move 
        if (blockedBy === "") return { pos: back, lastPossiblePos: false }
        // if its blocked its only a possible move if its the enemy player
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
export let determinPossibleMoves = async (pos: Position, log: Movement[], board: BoardHash): Promise<{ pieceType: string, pos: Position[] }> => {
    let type = board[pos.x + "" + pos.y].content
    // checks if the position has no game piece
    if (type !== null) {
        // determines all possible Move the selected game piece can make
        let moves = await MoveSet[type](pos, board)
        let extraMoves = await rochade(board, log, pos)
        moves = moves.concat(extraMoves)
        return { pieceType: type, pos: moves }
    }
    throw new Error("Die Position enthält keine Figur")
}
