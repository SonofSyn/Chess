import { displayBoard, displayPossibleMoves } from "../tools/display"
import { isBlockedBy, checkMove } from "../tools/tools"
import { Game } from "../../types/interfaces"
import { Position } from "../../types/type"
import { executeMove } from "./execMove"
import * as io from 'readline-sync';
/**
 * Handles output and user input for each turn and 
 *
 * @param {Game} game
 * @return {*}  {Promise<Game>}
 */
export let processTurn = async (game: Game): Promise<Game> => {
    console.log("")
    console.log(await displayBoard(game.gameBoard))
    console.log("Der Spieler " + (game.turn % 2 === 0 ? "Weiß" : "Schwarz") + " ist am Zug")

    // Asks with chess piece should be moved and checks input
    let answer = io.question("Welche Figur wollen sie Bewegen? (Bsp.A1)   ")
    if (answer[0].toLocaleUpperCase().charCodeAt(0) < 65 || answer[0].toLocaleUpperCase().charCodeAt(0) > 72) {
        console.log("Bitte eine richtige Position angeben")
        return game
    }
    if (isNaN(parseInt(answer[1])) || parseInt(answer[1]) === 0) {
        console.log("Bitte eine richtige Position angeben")
        return game
    }

    // Converts input into positions
    let xPos: number = answer[0].toLocaleUpperCase().charCodeAt(0) - 64
    let yPos: number = parseInt(answer[1])
    let info: { display: string[][]; moves: Position[]; }

    try {
        // checks if a game piece of the current turn was selected
        let turnPlayer = (game.turn % 2 === 0 ? "weiss" : "schwarz")
        if (turnPlayer !== await isBlockedBy({ x: xPos, y: yPos }, game.gameBoard)) {
            console.log("Falsche Farbe wurde ausgewählt")
            return game
        }
        // displays all Moves the selected game piece can make
        info = await displayPossibleMoves(game, { x: xPos, y: yPos })
        console.log(info.display)
        // checks if the game piece can be moved
        if (info.moves.length === 0) {
            console.log("Diese  Figur hat keine möglichen Zuegen")
            return game
        }
    } catch (e) {
        console.error(Error(e).message)
        return game
    }
    // Asks which of the moves possible for the game piece should be made
    let answer2 = io.question("Welchen der markierten Zuege wollen sie nehmen   ")
    // Converts input into positions
    let movexPos: number = answer2[0].toLocaleUpperCase().charCodeAt(0) - 64
    let moveyPos: number = parseInt(answer2[1])
    // checks if the move chosen is a move that the game piece can make
    if (!(await checkMove(info.moves, { x: movexPos, y: moveyPos }))) {
        console.error("Sie haben keine der möglichen Zuegen gewählt !!!")
        return game
    }
    // executes user input
    try {
        game = await executeMove(game, { x: xPos, y: yPos }, { x: movexPos, y: moveyPos })
    } catch (e) {
        console.error(Error(e).message)
        return game
    }

    return game
}