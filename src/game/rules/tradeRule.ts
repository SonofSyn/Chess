import { Chessfield, Game } from "../../types/interfaces"
import { Position, ChessPiece } from "../../types/type"
import * as io from 'readline-sync';

export let checkForTrade = (game: Game, orgPosData: Chessfield, newPosData: Chessfield):ChessPiece => {
    let trade = tradePawn(game, orgPosData.pos, newPosData.pos)
    if (trade !== null) newPosData.content = trade
    else newPosData.content = orgPosData.content
    return newPosData.content!
}

export let tradePawn = (game: Game, originalPos: Position, newPos: Position): ChessPiece | null => {
    if (game.gameBoard[originalPos.x + "" + originalPos.y].content === "Bauer") {
        let log: ChessPiece[] = []
        if (newPos.y === 1) { log = game.history.beatenLog.black }
        else if (newPos.y === 8) { log = game.history.beatenLog.white }
        if (log.length !== 0) {
            log.forEach((e, eIx) => console.log(eIx + " " + e))
            let answer = io.question("Welche Figur wollen sie fuer den Bauer tauschen? (Bsp.1)   ")
            let numb = parseInt(answer)
            if (isNaN(numb) || numb < 0 || numb > log.length) {
                (console.log("Error"))
                tradePawn(game, originalPos, newPos)
            }
            else {
                return log[numb]
            }
        }
    }
    return null
}