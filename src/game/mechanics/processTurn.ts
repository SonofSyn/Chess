import { displayBoard, displayPossibleMoves } from "../tools/display"
import { isBlockedBy, checkMove } from "../tools/tools"
import { Game } from "../../types/interfaces"
import { Position } from "../../types/type"
import { executeMove } from "./execMove"
import * as io from 'readline-sync';

export let processTurn = async (game: Game): Promise<Game> => {
    console.log("")
    console.log(await displayBoard(game.gameBoard))
    console.log("Der Spieler " + (game.turn % 2 === 0 ? "Weiß" : "Schwarz") + " ist am Zug")
    let answer = io.question("Welche Figur wollen sie Bewegen? (Bsp.A1)   ")

    if (answer[0].toLocaleUpperCase().charCodeAt(0) < 65 || answer[0].toLocaleUpperCase().charCodeAt(0) > 72) {
        console.log("Bitte eine richtige Position angeben")
        return game
    }
    if (isNaN(parseInt(answer[1])) || parseInt(answer[1]) === 0) {
        console.log("Bitte eine richtige Position angeben")
        return game
    }
    let xPos: number = answer[0].toLocaleUpperCase().charCodeAt(0) - 64
    let yPos: number = parseInt(answer[1])
    let info: { display: string[][]; moves: Position[]; }

    try {
        let turnPlayer = (game.turn % 2 === 0 ? "weiß" : "schwarz")
        if (turnPlayer !== await isBlockedBy({ x: xPos, y: yPos }, game.gameBoard)) {
            console.log("Falsche Farbe wurde ausgewählt")
            return game
        }
        info = await displayPossibleMoves(game, { x: xPos, y: yPos })
        console.log(info.display)
        if (info.moves.length === 0) {
            console.log("Diese  Figur hat keine möglichen Zuegen")
            return game
        }
    } catch (e) {
        console.error(Error(e).message)
        return game
    }
    let answer2 = io.question("Welchen der markierten Zuege wollen sie nehmen   ")
    let movexPos: number = answer2[0].toLocaleUpperCase().charCodeAt(0) - 64
    let moveyPos: number = parseInt(answer2[1])
    if (!checkMove(info.moves, { x: movexPos, y: moveyPos })) {
        console.error("Sie haben keine der möglichen Zuegen gewählt !!!")
        return game
    }
    try {
        game = await executeMove(game, { x: xPos, y: yPos }, { x: movexPos, y: moveyPos })
    } catch (e) {
        console.error(Error(e).message)
        return game
    }

    return game
}