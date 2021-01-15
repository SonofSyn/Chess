import { buildKey, isOnBoard } from "../tools/tools"
import { Chessfield, Game } from "../../types/interfaces"
import { Position } from "../../types/type"
import { checkForRochade } from "../rules/rochadeRule"
import { checkForTrade } from "../rules/tradeRule"
import { kingInCheck } from "../rules/kingInCheck"
import { checkMate } from "../rules/checkMate"





/**
 * Checks all rules and conditions and executes moves 
 *
 * @param {Chessboard} game
 * @param {Position} originalPos
 * @param {Position} newPos
 * @return {*}  {Chessboard}
 */
export let executeMove = async (game: Game, originalPos: Position, newPos: Position, skip = false): Promise<Game> => {
    let orgPosData = game.gameBoard[await buildKey(originalPos)]
    let newPosData = game.gameBoard[await buildKey(newPos)]

    // Filters if moves are made correctly
    if (!isOnBoard(newPos)) throw new Error("Die neue Position befindet sich nicht auf dem Board")
    if (orgPosData.content === null) throw new Error("Es befindet sich keine Spielfigur auf der Position")
    if (game.turn % 2 === 0 && orgPosData.player !== "weiß" && !skip) throw new Error("Spieler Weiß ist am Zug")
    else if (game.turn % 2 === 1 && orgPosData.player !== "schwarz" && !skip) throw new Error("Spieler Schwarz ist am Zug")

    // Checks whether the move beat a game piece
    if (newPosData.content !== null) {
        //logs beaten chesspiece
        if (newPosData.player === "weiß") game.history.beatenLog.white.push(newPosData.content!)
        else game.history.beatenLog.black.push(newPosData.content!)
    }
    // Checks for the rochade rule
    if (!skip) game = await checkForRochade(game, originalPos, newPos)

    // registers move
    let backup = await doMove(game, orgPosData, newPosData)

    // checks Move if move cant be done because of check
    let check = await kingInCheck(game, newPosData.player)
    if (check.length > 0) {
        await undoMove(orgPosData, newPosData, backup)
        throw new Error("Zug nicht moeglich ansonsten Schachmatt")
    }

    // Skips 1 turn if the roachde rule is applied since its two moves
    if (!skip) game.turn = game.turn + 1

    // log move
    game.history.movementLog.push({ orgPos: originalPos, newPos: newPos, chessPiece: orgPosData.content!, player: orgPosData.player! })
    // checks if the enemy is now in check

    check = await kingInCheck(game, newPosData.player === "weiß" ? "schwarz" : "weiß")
    if (check.length > 0) {
        console.log("Schach")
        // checks if the game is finished
        if (await checkMate(game, newPosData.player)) {
            console.log("Schachmatt")
            game.winner = ((game.turn - 1) % 2 === 0 ? "weiß" : "schwarz")
        }
    }
    return game
}

/**
 * Switches pieces on the board and checks a trade condition
 *
 * @param {Game} game
 * @param {Chessfield} orgPosData
 * @param {Chessfield} newPosData
 * @return {*} 
 */
export let doMove = async (game: Game, orgPosData: Chessfield, newPosData: Chessfield):Promise<Chessfield> => {
    let backUp = Object.assign({}, newPosData)
    newPosData.content = await checkForTrade(game, orgPosData, newPosData)
    newPosData.player = orgPosData.player
    orgPosData.content = null
    orgPosData.player = ""
    return backUp
}

/**
 * Undos a switch of pieces with help of the backUp
 *
 * @param {Chessfield} orgPosData
 * @param {Chessfield} newPosData
 * @param {Chessfield} backUp
 */
export let undoMove = async (orgPosData: Chessfield, newPosData: Chessfield, backUp: Chessfield):Promise<void> => {
    orgPosData.content = newPosData.content
    orgPosData.player = newPosData.player
    newPosData.content = backUp.content
    newPosData.player = backUp.player
}