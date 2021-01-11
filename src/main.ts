import { initBoard } from "./game/board";
import { executeMove, startGame } from "./game/game";
import { displayPossibleMoves } from "./tools/display";
import { determinPossibleMoves } from "./tools/tools";
import { Game } from "./types/interfaces";

startGame()

// let gameId = "" + Date.now()
// let game: Game = { gameId, turn: 0, winner: "", gameBoard: initBoard(), history: { movementLog: [], beatenLog: { white: [], black: [] } } }
// game = executeMove(game,{x:4,y:1},{x:4,y:8})
// game = executeMove(game,{x:4,y:7},{x:2,y:6})
// game = executeMove(game,{x:2,y:2},{x:2,y:3})
// game = executeMove(game,{x:5,y:7},{x:8,y:3})
// console.log(displayPossibleMoves(game.gameBoard,{x:4,y:8}))
