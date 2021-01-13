import test from 'ava'
import { initBoard } from '../game/board'
import { Game } from '../types/interfaces'
import { MoveSet } from '../game/moves/moveSet'
import { Position } from '../types/type'
import { executeMove } from '../game/mechanics/execMove'
import { checkMoveDirection } from '../game/moves/checkMoveDirection'


test("Check Upwards direction", t => {
    let board = initBoard()
    let pos: Position = { x: 1, y: 3 }
    let testPositions: Position[] = []
    testPositions = testPositions.concat(checkMoveDirection(pos, board, 1, 8 - pos.y, 0, 1),)
    let checkPos: Position[] = [
        { x: 1, y: 4 },
        { x: 1, y: 5 },
        { x: 1, y: 6 },
        { x: 1, y: 7 },
    ]
    t.deepEqual(testPositions, checkPos)
})


test("Check pawn in start Position", t => {
    let board = initBoard()
    let pos: Position[] = MoveSet["Bauer"]({ x: 2, y: 2 }, board)
    let checkPos: Position[] = [
        { x: 2, y: 4 },
        { x: 2, y: 3 },
    ]
    t.deepEqual(pos, checkPos)
})

test("Check moved pawn", async t => {
    let board = initBoard()
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: board ,history:{movementLog:[],beatenLog:{white:[],black:[]}}}
    game = await executeMove(game, { x: 2, y: 2 }, { x: 2, y: 3 });
    let pos: Position[] = MoveSet["Bauer"]({ x: 2, y: 3 }, board)
    let checkPos: Position[] = [
        { x: 2, y: 4 },
    ]
    t.deepEqual(pos, checkPos)
})

test("Check moved pawn in attack position", async t => {
    let board = initBoard()
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: board ,history:{movementLog:[],beatenLog:{white:[],black:[]}}}
    game = await executeMove(game, { x: 1, y: 2 }, { x: 1, y: 6 });
    let pos: Position[] = MoveSet["Bauer"]({ x: 1, y: 6 }, board)
    let checkPos: Position[] = [
        { x: 2, y: 7 },
    ]
    t.deepEqual(pos, checkPos)
})

test("Check tower movement", async t => {
    let board = initBoard()
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: board ,history:{movementLog:[],beatenLog:{white:[],black:[]}}}
    game = await executeMove(game, { x: 1, y: 1 }, { x: 3, y: 3 });
    let pos: Position[] = MoveSet["Turm"]({ x: 3, y: 3 }, board)
    let checkPos: Position[] = [ 
        { x: 3, y: 4 },
        { x: 3, y: 5 },
        { x: 3, y: 6 },
        { x: 3, y: 7 },
        { x: 2, y: 3 },
        { x: 1, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
        { x: 7, y: 3 },
        { x: 8, y: 3 } ]
    t.deepEqual(pos, checkPos)
})


test("Check knight movement", async t => {
    let board = initBoard()
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: board ,history:{movementLog:[],beatenLog:{white:[],black:[]}}}
    game = await executeMove(game, { x: 2, y: 1 }, { x: 3, y: 3 });
    let pos: Position[] = MoveSet["Springer"]({ x: 3, y: 3 }, board)
    let checkPos: Position[] = [ 
        { x: 1, y: 4 },
        { x: 2, y: 5 },
        { x: 2, y: 1 },
        { x: 4, y: 5 },
        { x: 5, y: 4 } ]
    t.deepEqual(pos, checkPos)
})

test("Check bishop movement", async t => {
    let board = initBoard()
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: board ,history:{movementLog:[],beatenLog:{white:[],black:[]}}}
    game = await executeMove(game, { x: 3, y: 1 }, { x: 5, y: 5 });
    let pos: Position[] = MoveSet["Läufer"]({ x: 5, y: 5 }, board)
    let checkPos: Position[] = [ 
        { x: 6, y: 6 },
        { x: 7, y: 7 },
        { x: 4, y: 6 },
        { x: 3, y: 7 },
        { x: 4, y: 4 },
        { x: 3, y: 3 },
        { x: 6, y: 4 },
        { x: 7, y: 3 } ]
    t.deepEqual(pos, checkPos)
})


test("Check queen movement", async t => {
    let board = initBoard()
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: board ,history:{movementLog:[],beatenLog:{white:[],black:[]}}}
    game = await executeMove(game, { x: 4, y: 1 }, { x: 6, y: 5 });
    let pos: Position[] = MoveSet["Königin"]({ x: 6, y: 5 }, board)
    let checkPos: Position[] = [ 
        { x: 6, y: 6 },
        { x: 6, y: 7 },
        { x: 6, y: 4 },
        { x: 6, y: 3 },
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 5 },
        { x: 1, y: 5 },
        { x: 7, y: 5 },
        { x: 8, y: 5 },
        { x: 7, y: 6 },
        { x: 8, y: 7 },
        { x: 5, y: 6 },
        { x: 4, y: 7 },
        { x: 5, y: 4 },
        { x: 4, y: 3 },
        { x: 7, y: 4 },
        { x: 8, y: 3 } ]
    t.deepEqual(pos, checkPos)
})

test("Check king movement", async t => {
    let board = initBoard()
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: board ,history:{movementLog:[],beatenLog:{white:[],black:[]}}}
    game = await executeMove(game, { x: 5, y: 1 }, { x: 4, y: 5 });
    let pos: Position[] = MoveSet["König"]({ x: 4, y: 5 }, board)
    let checkPos: Position[] = [ 
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 5, y: 4 },
        { x: 5, y: 5 },
        { x: 4, y: 6 },
        { x: 5, y: 6 },
        { x: 3, y: 6 } ]
    t.deepEqual(pos, checkPos)
})