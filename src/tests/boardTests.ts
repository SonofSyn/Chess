import test from 'ava'
import { initBoard } from '../game/board'

test("create Board", t => {
    let board = initBoard()
    t.is(Object.keys(board).length, 64)
})

test("check for king", t => {
    let board = initBoard()
    t.is(board["51"].content, "König")
})

test("check if empty", t => {
    let board = initBoard()
    t.is(board["44"].content, null)
})

test("check for black", t => {
    let board = initBoard()
    t.is(board["17"].player, "schwarz")
})


