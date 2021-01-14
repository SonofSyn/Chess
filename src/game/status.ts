import { checkServerIdentity } from "tls"
import { promisify } from "util"
import { forEachAsync } from "../async"
import { Chessfield, Game } from "../types/interfaces"
import { Player, Position } from "../types/type"
import { doMove, undoMove } from "./mechanics/execMove"
import { determinPossibleMoves } from "./moves/determinPossibleMoves"
import { kingInCheck } from "./rules/kingInCheck"
import { checkPatt, repetitionTie, checkDeadPositions } from "./rules/pattRule"





export let checkForWinner = async (game: Game, kingPos: Position) => {
    let fieldData: Chessfield
    let noMovesLeftFlag = false
    Object.keys(game.gameBoard).forEach(async field => {
        fieldData = game.gameBoard[field]
        if (fieldData.player === game.gameBoard[kingPos.x + "" + kingPos.y].player) {
            let moves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
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


export let checkForCheckMate = async (game: Game, color: Player) => {
    let fieldData: Chessfield
    let noMovesLeft = false
    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        if (fieldData.player !== (color === "schwarz" ? "weiß" : "schwarz") && !noMovesLeft && fieldData.content !== null) {
            let possibleMoves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
            let moveCounter = 0
            await forEachAsync(possibleMoves.pos, async move => {
                if (!noMovesLeft) {
                    let backup = await doMove(game, fieldData, game.gameBoard[move.x + "" + move.y])
                    let check = await kingInCheck(game, game.gameBoard[move.x + "" + move.y].player ? "weiß" : "schwarz")
                    if (check.length > 0) {
                        moveCounter++
                        if (moveCounter === possibleMoves.pos.length) noMovesLeft = true
                    }

                    await undoMove(fieldData, game.gameBoard[move.x + "" + move.y], backup)
                }
            })
        }
    })
    return noMovesLeft
}
