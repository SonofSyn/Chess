import { Game } from "../types/interfaces"
import { Position } from "../types/type"
import { checkPatt, repetitionTie, checkDeadPositions } from "./rules/pattRule"

export let checkForWinner = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (game.gameBoard[newPos.x + "" + newPos.y].content === "König") game.winner = game.gameBoard[originalPos.x + "" + originalPos.y].player
    return game
}

export let checkForTie = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (checkPatt() || repetitionTie() || checkDeadPositions()) game.winner = "Tie"
    return game
}