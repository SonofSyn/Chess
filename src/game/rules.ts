import { Chessfield, Game } from "../types/interfaces"
import { ChessPiece, Player, Position } from "../types/type"
import * as io from 'readline-sync';

export let tradePawn = (game: Game, originalPos: Position, newPos: Position):ChessPiece|null => {
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
            else{
                return log[numb]
            } 
        }
    }
    return null
}

export let checkForWinner = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (game.gameBoard[newPos.x + "" + newPos.y].content === "König") game.winner = game.gameBoard[originalPos.x + "" + originalPos.y].player
    return game
}

export let checkForTie = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (checkPatt() || repetitionTie() || checkDeadPositions()) game.winner = "Tie"
    return game
}

export let rochade = () => {

}

export let checkKing = () => {

}

let checkPatt = (): boolean => {
    let back = false

    return back
}

let repetitionTie = (): boolean => {
    let back = false

    return back
}

let checkDeadPositions = (): boolean => {
    let back = false

    return back
}

