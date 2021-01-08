import { buildBoard, displayBoard, displayPossibleMoves } from "./board";
import { determinPossibleMoves, determinPossibleMove, isOnBoard, isBlockedBy } from "./chessPieces";
import { executeMove, Game, startGame } from "./gameEngine";



startGame()
// let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: buildBoard() }
// // console.log(board.board)
// console.log(displayBoard(game.gameBoard))
// // game = executeMove(game, { x: 1, y: 1 }, { x: 3, y: 3 });
// console.log(displayPossibleMoves(game.gameBoard,{x:2,y:7}).display)


// console.log(displayBoard(game.gameBoard))
// console.log(displayBoard(board))
// console.log(determinPossibleMoves({ x: 5, y: 5 }, game.gameBoard.board))
// console.log(isBlockedBy({x:2,y:5},board.board))