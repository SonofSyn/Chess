import test from 'ava'
import { initBoard } from '../game/board'
import { isBlockedBy, isOnBoard } from '../game/tools/tools'


test("Position on board", async t => {
    let flag = true
    for (let x = 1; x < 9; x++) {
        for (let y = 1; y < 9; y++) {
            let test = await isOnBoard({ x: x, y: y })
            if (!test) flag = false
        }
    }
    t.is(flag, true)

})

test("Position not on board", async t => {
    t.is(await isOnBoard({ x: 0, y: 0 }), false)
})

test("Position is blocked by black", async t => {
    let board = await initBoard()
    t.is(await isBlockedBy({ x: 1, y: 7 }, board), "schwarz")
})

