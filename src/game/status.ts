import { forEachAsync } from "../async"
import { Chessfield, Game } from "../types/interfaces"
import { Player, Position } from "../types/type"
import { doMove, undoMove } from "./mechanics/execMove"
import { determinPossibleMoves } from "./moves/determinPossibleMoves"
import { kingInCheck } from "./rules/kingInCheck"
import { checkPatt, repetitionTie, checkDeadPositions } from "./rules/pattRule"




export let checkForTie = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (checkPatt() || repetitionTie() || checkDeadPositions()) game.winner = "Tie"
    return game
}


export let checkForCheckMate = async (game: Game, color: Player, lastMove: Position) => {
    let fieldData: Chessfield
    let checkMate = true
    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        if (fieldData.player !== (color) && fieldData.content !== null) {
            let possibleMoves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
            await forEachAsync(possibleMoves.pos, async move => {

                if (move.x + "" + move.y !== lastMove.x + "" + lastMove.y) {
                    let backup = await doMove(game, fieldData, game.gameBoard[move.x + "" + move.y])
                    let check = await kingInCheck(game, game.gameBoard[move.x + "" + move.y].player)
                    if (check.length === 0) checkMate = false
                    await undoMove(fieldData, game.gameBoard[move.x + "" + move.y], backup)
                }


            })
        }
    })
    return checkMate
}
