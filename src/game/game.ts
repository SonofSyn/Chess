import { initBoard } from "./board";
import { Game } from "../types/interfaces";
import { processTurn } from "./mechanics/processTurn";


export let startGame = () => {
    let gameId = "" + Date.now()
    let game: Game = { gameId, turn: 0, winner: "", gameBoard: initBoard(), history: { movementLog: [], beatenLog: { white: [], black: [] } } }
    while (game.winner === "") {
        game = processTurn(game)
    }
    console.log("Der Sieger ist " + game.winner)
}


