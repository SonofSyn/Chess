import { BoardHash, Player, Position } from "./board";
import { MoveSet } from "./moveSet";

export type ChessPiece = "Bauer" | "Turm" | "Springer" | "Läufer" | "Königin" | "König"
export interface PossibleMove { pos: Position | null, break: boolean }
export interface GamePiece {
    type: ChessPiece,
    color: "white" | "black"
    pos: Position,
    possibleMoves: Position[]
}
export interface Move { x: number, y: number }

export const startSet: ChessPiece[][] = [
    ["Turm", "Springer", "Läufer", "Königin", "König", "Läufer", "Springer", "Turm"],
    ["Bauer", "Bauer", "Bauer", "Bauer", "Bauer", "Bauer", "Bauer", "Bauer"]
]

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
 * @param {Move} move
 * @param {BoardHash} board
 * @return {*}  {PossibleMove}
 */
export let determinPossibleMove = (pos: Position, move: Move, board: BoardHash): PossibleMove => {
    let back: Position = { x: pos.x + move.x, y: pos.y + move.y }
    if (isOnBoard(back)) {
        let blockedBy = isBlockedBy(back, board)
        if (blockedBy === "") return { pos: back, break: false }
        if (blockedBy !== board[pos.x + "" + pos.y].player) return { pos: back, break: true }
        else return { pos: null, break: true }
    }
    else return { pos: null, break: true }
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
export let determinPossibleMoves = (pos: Position, board: BoardHash): { pieceType: string, pos: Position[] } => {
    let type = board[pos.x + "" + pos.y].content
    if (type !== null) return { pieceType: type, pos: MoveSet[type](pos, board) }
    throw new Error("Die Position enthält keine Figur")
}

export let checkMove = (posMove: Position[], move: Position): boolean => {
    let back = false
    posMove.forEach(pos => {
        if(pos.x===move.x && pos.y===move.y)back=true
    })
    return back
}