import { buildKey, isOnBoard } from "../tools/tools"
import { Chessfield, Game } from "../../types/interfaces"
import { Position } from "../../types/type"
import { checkForRochade } from "../rules/rochadeRule"
import { checkForTrade } from "../rules/tradeRule"
import { kingInCheck } from "../rules/kingInCheck"
import { checkForCheckMate } from "../status"




/**
 * Moves a gamepiece on the board
 *
 * @param {Chessboard} game
 * @param {Position} originalPos
 * @param {Position} newPos
 * @return {*}  {Chessboard}
 */
export let executeMove = async (game: Game, originalPos: Position, newPos: Position, skip = false): Promise<Game> => {
    let orgPosData = game.gameBoard[await buildKey(originalPos)]
    let newPosData = game.gameBoard[await buildKey(newPos)]
    if (!isOnBoard(newPos)) throw new Error("Die neue Position befindet sich nicht auf dem Board")
    if (orgPosData.content === null) throw new Error("Es befindet sich keine Spielfigur auf der Position")
    if (game.turn % 2 === 0 && orgPosData.player !== "weiß" && !skip) throw new Error("Spieler Weiß ist am Zug")
    else if (game.turn % 2 === 1 && orgPosData.player !== "schwarz" && !skip) throw new Error("Spieler Schwarz ist am Zug")
    if (newPosData.content !== null) {
        //logs beaten chesspiece
        if (newPosData.player === "weiß") game.history.beatenLog.white.push(newPosData.content!)
        else game.history.beatenLog.black.push(newPosData.content!)
    }
    if (!skip) game = checkForRochade(game, originalPos, newPos)

    let backup = await doMove(game, orgPosData, newPosData)
    let check = await kingInCheck(game, newPosData.player)
    if (check.length > 0) {
        await undoMove(orgPosData, newPosData, backup)
        throw new Error("Zug nicht moeglich ansonsten Schachmatt")
    }

    if (!skip) game.turn = game.turn + 1
    game.history.movementLog.push({ orgPos: originalPos, newPos: newPos, chessPiece: orgPosData.content!, player: orgPosData.player! })
    check = await kingInCheck(game, newPosData.player === "weiß" ? "schwarz" : "weiß")
    if (check.length > 0) {
        console.log("Schach")
        if (await checkForCheckMate(game, newPosData.player, newPosData.pos)) {
            console.log("Schachmatt")
            game.winner = ((game.turn - 1) % 2 === 0 ? "weiß" : "schwarz")
        }
    }

    return game
}

export let doMove = async (game: Game, orgPosData: Chessfield, newPosData: Chessfield) => {
    let backUp = Object.assign({}, newPosData)
    newPosData.content = checkForTrade(game, orgPosData, newPosData)
    newPosData.player = orgPosData.player
    orgPosData.content = null
    orgPosData.player = ""
    return backUp
}

export let undoMove = async (orgPosData: Chessfield, newPosData: Chessfield, backUp: Chessfield) => {
    orgPosData.content = newPosData.content
    orgPosData.player = newPosData.player
    newPosData.content = backUp.content
    newPosData.player = backUp.player
}