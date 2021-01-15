import { Chessfield, Game } from "../../types/interfaces"
import { Position, ChessPiece } from "../../types/type"
import * as io from 'readline-sync';
/**
 * checks if the trade rule is activated
 *
 * @param {Game} game
 * @param {Chessfield} orgPosData
 * @param {Chessfield} newPosData
 * @return {*}  {Promise<ChessPiece>}
 */
export let checkForTrade = async (game: Game, orgPosData: Chessfield, newPosData: Chessfield): Promise<ChessPiece> => {
    let trade = await tradePawn(game, orgPosData.pos, newPosData.pos)
    if (trade !== null) newPosData.content = trade
    else newPosData.content = orgPosData.content
    return newPosData.content!
}
/**
 * trades pawns reaching the end pos with a own beaten chess piece
 *
 * @param {Game} game
 * @param {Position} originalPos
 * @param {Position} newPos
 * @return {*}  {(Promise<"Bauer" | "Turm" | "Springer" | "Läufer" | "Königin" | "König" | null>)}
 */
export let tradePawn = async (game: Game, originalPos: Position, newPos: Position): Promise<"Bauer" | "Turm" | "Springer" | "Läufer" | "Königin" | "König" | null> => {
    // checks the chess piece moved is a pawn
    if (game.gameBoard[originalPos.x + "" + originalPos.y].content === "Bauer") {
        let log: ChessPiece[] = []
        // checks if the pawn is black
        if (newPos.y === 1) { log = game.history.beatenLog.black }
        // checks if the pawn is white
        else if (newPos.y === 8) { log = game.history.beatenLog.white }
        // if there are any beaten pieces
        if (log.length !== 0) {
            // log all pieces which can be traded
            log.forEach((e, eIx) => console.log(eIx + " " + e))
            let answer = io.question("Welche Figur wollen sie fuer den Bauer tauschen? (Bsp.1)   ")
            let numb = parseInt(answer)
            // if chosen piece input is correct
            if (isNaN(numb) || numb < 0 || numb > log.length) {
                console.log("Error")
                await tradePawn(game, originalPos, newPos)
            }
            else {
                return log[numb]
            }
        }
    }
    return null
}