import test from 'ava'
import { initBoard } from "../game/board"
import { executeMove } from "../game/mechanics/execMove"
import { determinPossibleMoves } from "../game/moves/determinPossibleMoves"
import { Game } from "../types/interfaces"
import { Position } from "../types/type"

test("This position contains no chess piece", t => {
    let board = initBoard()
    let err = t.throws(() => {
        determinPossibleMoves({ x: 4, y: 4 }, [], board)
    }, undefined)
    t.is(err.message, 'Die Position enthält keine Figur')
})


test("Test knight movement", async t => {
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: initBoard(), history: { movementLog: [], beatenLog: { white: [], black: [] } } }
    game = await executeMove(game, { x: 7, y: 1 }, { x: 6, y: 3 });
    let info = determinPossibleMoves({ x: 6, y: 3 }, game.history.movementLog, game.gameBoard)
    let checkPos: Position[] = [
        { x: 4, y: 4 },
        { x: 5, y: 5 },
        { x: 7, y: 5 },
        { x: 7, y: 1 },
        { x: 8, y: 4 }]
    t.is(info.pieceType, "Springer")
    t.deepEqual(info.pos, checkPos)
})
