import test from 'ava'
import { buildBoard } from '../board'

test("create Board", t => {
    let board = buildBoard()
    t.is(Object.keys(board.board).length, 64)
})

test("check for king", t => {
    let board = buildBoard()
    t.is(board.board["51"].content, "König")
})

test("check if empty", t => {
    let board = buildBoard()
    t.is(board.board["44"].content, null)
})

test("check for black", t => {
    let board = buildBoard()
    t.is(board.board["17"].player, "schwarz")
})


