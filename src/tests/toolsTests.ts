import test from 'ava'
import { initBoard } from '../game/board'
import { determinPossibleMoves, isBlockedBy, isOnBoard } from '../tools/tools'
import { executeMove } from '../game/game'
import { Game } from '../types/interfaces'
import { Position } from '../types/type'

test("Position on board", t => {
    let flag = true
    for (let x = 1; x < 9; x++) {
        for (let y = 1; y < 9; y++) {
            let test = isOnBoard({ x: x, y: y })
            if (!test) flag = false
        }
    }
    t.is(flag, true)

})

test("Position not on board", t => {
    t.is(isOnBoard({ x: 0, y: 0 }), false)
})

test("Position is blocked by black", t => {
    let board = initBoard()
    t.is(isBlockedBy({ x: 1, y: 7 }, board), "schwarz")
})

test("This position contains no chess piece", t => {
    let board = initBoard()
    let err = t.throws(() => {
        determinPossibleMoves({ x: 4, y: 4 }, [], board)
    }, undefined)
    t.is(err.message, 'Die Position enthält keine Figur')
})


test("Test knight movement", t => {
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: initBoard(), history: { movementLog: [], beatenLog: { white: [], black: [] } } }
    game = executeMove(game, { x: 7, y: 1 }, { x: 6, y: 3 });
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
