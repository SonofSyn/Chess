import test from 'ava'
import { initBoard } from '../game/board'

test("create Board", async t => {
    let board = await initBoard()
    t.is(Object.keys(board).length, 64)
})

test("check for king", async t => {
    let board = await initBoard()
    t.is(board["51"].content, "König")
})

test("check if empty", async t => {
    let board = await initBoard()
    t.is(board["44"].content, null)
})

test("check for black", async t => {
    let board = await initBoard()
    t.is(board["17"].player, "schwarz")
})


