import { forEachAsync } from "../../async";
import { Chessfield, Game } from "../../types/interfaces";
import { Player, Position } from "../../types/type";
import { determinPossibleMoves } from "../moves/determinPossibleMoves";

/**
 * Checks whether the own king is in check
 *
 * @param {Game} game
 * @param {Player} color
 * @return {*}  {Promise<{ field: Chessfield, kingPos: Position }[]>}
 */
export let kingInCheck = async (game: Game, color: Player): Promise<{ field: Chessfield, kingPos: Position }[]> => {
    let kingPos: Position
    let fieldData: Chessfield
    let back: { field: Chessfield, kingPos: Position }[] = []
    // goes through all game pieces
    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        // saves the position of the own king
        if (fieldData.content === "Koenig" && fieldData.player === color) kingPos = fieldData.pos
    })
    // goes through all game pieces
    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        // checks if all positions are not empty and the positions is an enemies 
        if (fieldData.content !== null && fieldData.player !== color) {
            // checks all possible moves the enemy can make
            let possibleMoves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
            await forEachAsync(possibleMoves.pos, async pos => {
                // checks if the enemy can attack own king and is in check
                if (pos.x === kingPos.x && pos.y === kingPos.y) back.push({ field: game.gameBoard[field], kingPos })
            })
        }
    })


    return back
}
