import { forEachAsync } from "../async"
import { Chessfield, Game } from "../types/interfaces"
import { Player, Position } from "../types/type"
import { doMove, undoMove } from "./mechanics/execMove"
import { determinPossibleMoves } from "./moves/determinPossibleMoves"
import { kingInCheck } from "./rules/kingInCheck"
import { checkPatt, repetitionTie, checkDeadPositions } from "./rules/pattRule"




export let checkForTie = async(game: Game, originalPos: Position, newPos: Position): Promise<Game> => {
    // if (checkPatt() || repetitionTie() || checkDeadPositions()) game.winner = "Tie"
    return game
}

