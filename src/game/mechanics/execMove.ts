import { isOnBoard } from "../tools/tools"
import { Game } from "../../types/interfaces"
import { Player, Position } from "../../types/type"
import { checkForRochade } from "../rules/rochadeRule"
import { checkForTrade, tradePawn } from "../rules/tradeRule"
import { checkForWinner } from "../status"
import { kingInCheck } from "../rules/kingInCheck"
import { Console } from "console"




/**
 * Moves a gamepiece on the board
 *
 * @param {Chessboard} game
 * @param {Position} originalPos
 * @param {Position} newPos
 * @return {*}  {Chessboard}
 */
export let executeMove = (game: Game, originalPos: Position, newPos: Position, skip = false): Game => {
    let orgPosData = game.gameBoard[originalPos.x + "" + originalPos.y]
    let newPosData = game.gameBoard[newPos.x + "" + newPos.y]
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
    game = checkForWinner(game, originalPos, newPos)
    newPosData.content = checkForTrade(game, orgPosData, newPosData)
    newPosData.player = orgPosData.player
    orgPosData.content = null
    orgPosData.player = ""
    if (!skip) game.turn = game.turn + 1
    game.history.movementLog.push({ orgPos: originalPos, newPos: newPos, chessPiece: orgPosData.content!, player: orgPosData.player! })

    let check = kingInCheck(game, newPosData.player === "schwarz" ? "weiß" : "schwarz")
    if (check !== null) throw new Error("Es befindet sich keine Spielfigur auf der Position")
    kingInCheck(game, newPosData.player)
    return game
}