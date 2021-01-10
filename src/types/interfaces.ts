import { Position, ChessPiece, Player } from "./type";

export interface Game {
    gameId: string,
    turn: number,
    winner: Player,
    gameBoard: BoardHash,
    history: History
}

export interface History { movementLog: Movement[], beatenLog: BeatenPieces }
export interface Movement { orgPos: Position, newPos: Position }
export interface BeatenPieces { white: ChessPiece[], black: ChessPiece[] }

export interface BoardHash { [pos: string]: Chessfield }
export interface Chessfield { pos: Position, content: null | ChessPiece, player: Player }

export interface MoveTemplate { [chessPiece: string]: (pos: Position, board: BoardHash) => Position[] }
export interface PossibleMove { pos: Position | null, lastPossiblePos: boolean }