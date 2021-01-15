import { forEachAsync } from "../../async";
import { Chessfield, Game } from "../../types/interfaces";
import { Player, Position } from "../../types/type";
import { determinPossibleMoves } from "../moves/determinPossibleMoves";
import { buildKey } from "../tools/tools";


export let kingInCheck = async (game: Game, color: Player) => {
    let kingPos: Position
    let fieldData: Chessfield
    let back: { field: Chessfield, kingPos: Position }[] = []


    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        if (fieldData.content === "König" && fieldData.player !== (color === "schwarz" ? "weiß" : "schwarz")) kingPos = fieldData.pos
    })
    await forEachAsync(Object.keys(game.gameBoard), async field => {
        fieldData = game.gameBoard[field]
        if (fieldData.content !== null) {
            if (kingPos !== undefined)
                if (fieldData.player !== game.gameBoard[await buildKey(kingPos)].player) {
                    let possibleMoves = await determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
                    await forEachAsync(possibleMoves.pos, async pos => {
                        if (pos.x === kingPos.x && pos.y === kingPos.y) {
                            back.push({ field: game.gameBoard[field], kingPos })
                        }
                    })
                }
        }
    })


    return back
}
