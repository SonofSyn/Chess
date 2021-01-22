import { forEachAsync } from "../../async"
import { Chessfield, Game } from "../../types/interfaces"
import { Player } from "../../types/type"
import { determinPossibleMoves } from "../moves/determinPossibleMoves"

/**
 * Checks if the patt rule applies
 *
 * @param {Game} game
 * @param {Player} color
 * @return {*}  {Promise<boolean>}
 */
export let checkPatt = async (game: Game, color: Player): Promise<boolean> => {
    let noMovesLeft = true
    let noMovesLeft2 = true
    let fieldData: Chessfield
    //goes through all field
    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        // saves the position of the own king
        if (fieldData.player === color) {
            let moves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
            console.log(moves)
            // checks if player has no possible moves
            if ((moves).pos.length !== 0) noMovesLeft = false
        } else {
            let moves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
            // checks if other player has no possible moves
            if ((moves).pos.length !== 0) noMovesLeft2 = false
        }
    })
    // checks if any player has no more moves left and returns if the game is patt
    return noMovesLeft === true || noMovesLeft2 === true ? true : false
}

export let repetitionTie = (): boolean => {
    let back = false

    return back
}

export let checkDeadPositions = (): boolean => {
    let back = false

    return back
}