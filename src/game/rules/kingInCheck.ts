import { Chessfield, Game } from "../../types/interfaces";
import { Player, Position } from "../../types/type";
import { determinPossibleMoves } from "../moves/determinPossibleMoves";


export let kingInCheck = async (game: Game, color: Player) => {
    let kingPos: Position
    let fieldData: Chessfield
    let back: { field: Chessfield, kingPos: Position }[] = []
    Object.keys(game.gameBoard).forEach(field => {
        fieldData = game.gameBoard[field]
        if (fieldData.content === "König" && fieldData.player !== (color === "schwarz" ? "weiß" : "schwarz")) kingPos = fieldData.pos
    })
    Object.keys(game.gameBoard).forEach(field => {
        fieldData = game.gameBoard[field]
        if (fieldData.content !== null) {
            if (fieldData.player !== game.gameBoard[kingPos.x + "" + kingPos.y].player) {
                let possibleMoves = determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
                possibleMoves.pos.forEach(async (pos) => {
                    if (pos.x === kingPos.x && pos.y === kingPos.y) {
                        back.push({ field: game.gameBoard[field], kingPos})
                    }
                })
            }
        }

    });
    return back
}