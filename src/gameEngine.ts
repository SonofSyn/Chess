import { buildBoard, Chessboard, displayBoard, displayPossibleMoves, Player, Position } from "./board";
import { checkMove, isBlockedBy, isOnBoard } from "./chessPieces";
import * as io from 'readline-sync';


export interface Game {
    gameId: string,
    turn: number,
    winner: Player,
    gameBoard: Chessboard,
}

export let startGame = () => {
    let gameId = "" + Date.now()
    let game: Game = { gameId, turn: 0, winner: "", gameBoard: buildBoard() }
    while (game.winner === "") {
        game = runTurn(game)
    }

    console.log("Der Sieger ist " + game.winner)
}

/**
 * Moves a gamepiece on the board
 *
 * @param {Chessboard} game
 * @param {Position} originalPos
 * @param {Position} newPos
 * @return {*}  {Chessboard}
 */
export let executeMove = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (!isOnBoard(newPos)) throw new Error("Die neue Position befindet sich nicht auf dem Board")
    if (game.gameBoard.board[originalPos.x + "" + originalPos.y].content === null) throw new Error("Es befindet sich keine Spielfigur auf der Position")
    if (game.turn % 2 === 0 && game.gameBoard.board[originalPos.x + "" + originalPos.y].player !== "weiß") throw new Error("Spieler Weiß ist am Zug")
    else if (game.turn % 2 === 1 && game.gameBoard.board[originalPos.x + "" + originalPos.y].player !== "schwarz") throw new Error("Spieler Schwarz ist am Zug")

    if (game.gameBoard.board[newPos.x + "" + newPos.y].content !== null) {
        if (game.gameBoard.board[newPos.x + "" + newPos.y].player === "weiß") game.gameBoard.history.white.push(game.gameBoard.board[newPos.x + "" + newPos.y].content!)
        else game.gameBoard.history.black.push(game.gameBoard.board[newPos.x + "" + newPos.y].content!)
        if (game.gameBoard.board[newPos.x + "" + newPos.y].content === "König") game.winner = game.gameBoard.board[originalPos.x + "" + originalPos.y].player
    }

    game.gameBoard.board[newPos.x + "" + newPos.y].content = game.gameBoard.board[originalPos.x + "" + originalPos.y].content
    game.gameBoard.board[newPos.x + "" + newPos.y].player = game.gameBoard.board[originalPos.x + "" + originalPos.y].player
    game.gameBoard.board[originalPos.x + "" + originalPos.y].content = null
    game.gameBoard.board[originalPos.x + "" + originalPos.y].player = ""
    game.turn = game.turn + 1
    return game
}

export let runTurn = (game: Game): Game => {
    console.log("")
    console.log(displayBoard(game.gameBoard))
    console.log("Der Spieler " + (game.turn % 2 === 0 ? "Weiß" : "Schwarz") + " ist am Zug")
    let answer = io.question("Welche Figur wollen sie Bewegen? (Bsp.A1)   ")
    let xPos: number = answer[0].toLocaleUpperCase().charCodeAt(0) - 64
    let yPos: number = parseInt(answer[1])
    let info: { display: string[][]; moves: Position[]; }
    
    try {
        let turnPlayer = (game.turn % 2 === 0 ? "weiß" : "schwarz")
        if (turnPlayer !== isBlockedBy({ x: xPos, y: yPos }, game.gameBoard.board)) {
            console.log("Falsche Farbe wurde ausgewählt")
            return game
        }
        info = displayPossibleMoves(game.gameBoard, { x: xPos, y: yPos })
        console.log(info.display)
        if (info.moves.length === 0) {
            console.log("Diese hat Figur keine möglichen Zuegen")
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
        game = executeMove(game, { x: xPos, y: yPos }, { x: movexPos, y: moveyPos })
    } catch (e) {
        console.error(Error(e).message)
        return game
    }

    return game
}
