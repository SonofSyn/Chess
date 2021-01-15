import { initBoard } from "./board";
import { Game } from "../types/interfaces";
import { processTurn } from "./mechanics/processTurn";

/**
 * Starts a game session
 *
 * @return {*}  {Promise<void>}
 */
export let startGame = async ():Promise<void> => {
    let gameId = "" + Date.now()
    let game: Game = { gameId, turn: 0, winner: "", gameBoard: await initBoard(), history: { movementLog: [], beatenLog: { white: [], black: [] } } }
    while (game.winner === "") {
        game = await processTurn(game)
    }
    console.log("Der Sieger ist " + game.winner)
}


