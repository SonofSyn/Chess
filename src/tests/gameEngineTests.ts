import test from 'ava'
import { buildBoard } from '../board';
import { Game, executeMove } from '../gameEngine';

test("Move executed", t => {
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: buildBoard() }
    game = executeMove(game, { x: 2, y: 2 }, { x: 2, y: 3 });
    t.pass()
})

test("New Position not on board", t => {
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: buildBoard() }
    let err = t.throws(() => {
        game = executeMove(game, { x: 2, y: 2 }, { x: 9, y: 11 });
    }, undefined)
    t.is(err.message, "Die neue Position befindet sich nicht auf dem Board")
})

test("No gamepiece on selected position", t => {
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: buildBoard() }
    let err = t.throws(() => {
        game = executeMove(game, { x: 3, y: 3 }, { x: 3, y: 4 });
    }, undefined)
    t.is(err.message, "Es befindet sich keine Spielfigur auf der Position")
})

test("Wrong turn Black", t => {
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: buildBoard() }
    let err = t.throws(() => {
        game = executeMove(game, { x: 2, y: 7 }, { x: 2, y: 6 });
    }, undefined)
    t.is(err.message, "Spieler Weiß ist am Zug")
})

test("Wrong turn White", t => {
    let game: Game = { gameId: "1", turn: 0, winner: "", gameBoard: buildBoard() }
    game = executeMove(game, { x: 2, y: 2 }, { x: 2, y: 3 });
    let err = t.throws(() => {
        game = executeMove(game, { x: 3, y: 2 }, { x: 3, y: 3 });
    }, undefined)
    t.is(err.message, "Spieler Schwarz ist am Zug")
})