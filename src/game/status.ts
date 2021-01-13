import { Chessfield, Game } from "../types/interfaces"
import { Position } from "../types/type"
import { determinPossibleMoves } from "./moves/determinPossibleMoves"
import { checkPatt, repetitionTie, checkDeadPositions } from "./rules/pattRule"

export let checkForWinner = (game: Game, kingPos: Position): Game => {
    let fieldData: Chessfield
    let noMovesLeftFlag = false
    Object.keys(game.gameBoard).forEach(field => {
        fieldData = game.gameBoard[field]
        if (fieldData.player === game.gameBoard[kingPos.x + "" + kingPos.y].player) {
            let moves = determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
            moves.pos.forEach(move => {
                
            });
        }
    })

    return game
}

export let checkForTie = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (checkPatt() || repetitionTie() || checkDeadPositions()) game.winner = "Tie"
    return game
}