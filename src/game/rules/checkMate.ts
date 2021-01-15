import { forEachAsync } from "../../async"
import { Game, Chessfield } from "../../types/interfaces"
import { Player } from "../../types/type"
import { doMove, undoMove } from "../mechanics/execMove"
import { determinPossibleMoves } from "../moves/determinPossibleMoves"
import { buildKey } from "../tools/tools"
import { kingInCheck } from "./kingInCheck"
/**
 * Checks if the game is finished
 *
 * @param {Game} game
 * @param {Player} color
 * @param {Position} lastMove
 * @return {*}  {Promise<boolean>}
 */
export let checkMate = async (game: Game, color: Player): Promise<boolean> => {
    let fieldData: Chessfield
    let checkMate = true

    // go through every piece of the board
    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        // if the pos contains an enemy game piece
        if (fieldData.player !== (color) && fieldData.content !== null) {
            // determin all moves the enemy game piece can make
            let possibleMoves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
            await forEachAsync(possibleMoves.pos, async move => {
                //  trys all moves of enemy game pieces and check if they have atleast one move to get out of check
                let backup = await doMove(game, fieldData, game.gameBoard[await buildKey(move)])
                let check = await kingInCheck(game, game.gameBoard[await buildKey(move)].player)
                if (check.length === 0) checkMate = false
                await undoMove(fieldData, game.gameBoard[await buildKey(move)], backup)

            })
        }
    })
    return checkMate
}