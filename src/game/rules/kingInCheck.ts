import { Chessfield, Game } from "../../types/interfaces";
import { Player, Position } from "../../types/type";
import { determinPossibleMoves } from "../moves/determinPossibleMoves";


export let kingInCheck = (game: Game, color: Player): { field: Chessfield, kingPos: Position } | null => {
    let kingPos: Position
    let fieldData: Chessfield
    let back: { field: Chessfield, kingPos: Position } | null = null
    Object.keys(game.gameBoard).forEach(field => {
        fieldData = game.gameBoard[field]
        if (fieldData.content === "König" && fieldData.player !== color) kingPos = fieldData.pos
    })
    Object.keys(game.gameBoard).forEach(field => {
        fieldData = game.gameBoard[field]
        if (fieldData.content !== null) {
            if (fieldData.player !== game.gameBoard[kingPos.x + "" + kingPos.y].player) {
                let possibleMoves = determinPossibleMoves(fieldData.pos, game.history.movementLog, game.gameBoard)
                possibleMoves.pos.forEach(pos => {
                    if (pos.x === kingPos.x && pos.y === kingPos.y) {
                        console.log("Schach")
                        back = { field: fieldData, kingPos }
                    }
                })
            }
        }

    });
    return back
}