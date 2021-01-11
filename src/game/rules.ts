import { Chessfield, Game } from "../types/interfaces"
import { ChessPiece, Player, Position } from "../types/type"
import * as io from 'readline-sync';

export let tradePawn = (game: Game, originalPos: Position, newPos: Position): ChessPiece | null => {
    if (game.gameBoard[originalPos.x + "" + originalPos.y].content === "Bauer") {
        let log: ChessPiece[] = []
        if (newPos.y === 1) { log = game.history.beatenLog.black }
        else if (newPos.y === 8) { log = game.history.beatenLog.white }
        if (log.length !== 0) {
            log.forEach((e, eIx) => console.log(eIx + " " + e))
            let answer = io.question("Welche Figur wollen sie fuer den Bauer tauschen? (Bsp.1)   ")
            let numb = parseInt(answer)
            if (isNaN(numb) || numb < 0 || numb > log.length) {
                (console.log("Error"))
                tradePawn(game, originalPos, newPos)
            }
            else {
                return log[numb]
            }
        }
    }
    return null
}

export let checkForWinner = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (game.gameBoard[newPos.x + "" + newPos.y].content === "König") game.winner = game.gameBoard[originalPos.x + "" + originalPos.y].player
    return game
}

export let checkForTie = (game: Game, originalPos: Position, newPos: Position): Game => {
    if (checkPatt() || repetitionTie() || checkDeadPositions()) game.winner = "Tie"
    return game
}

export let rochade = (game: Game, originalPos: Position) => {
    let back: Position[] = []
    let kingPos: Position[] = [{ x: 5, y: 1 }, { x: 5, y: 8 }]
    let towerPos: Position[] = [{ x: 1, y: 1 }, { x: 8, y: 1 }, { x: 1, y: 8 }, { x: 8, y: 8 }]
    if (game.gameBoard[originalPos.x + "" + originalPos.y].content === "König") {
        kingPos.forEach(pos => {
            if (pos.x === originalPos.x && pos.y === originalPos.y) {
                let found = false
                game.history.movementLog.forEach(movement => {
                    if (movement.orgPos.x == originalPos.x && movement.orgPos.x === originalPos.y) { found = true }
                })
                if (!found) {
                    towerPos.forEach(tower => {
                        if (tower.y === originalPos.y) {
                            let iter = tower.x < originalPos.x ? tower.x : originalPos.x
                            let bounds = tower.x < originalPos.x ? originalPos.x : tower.x
                            let notEmptyFlag = false
                            for (let i = iter + 1; i < bounds; i++) {
                                if (game.gameBoard[iter + "" + originalPos.y].content !== null) notEmptyFlag = true
                            }
                            if (!notEmptyFlag) {
                                back.push({ x: tower.x < originalPos.x ? tower.x + 1 : tower.x - 1, y: tower.y })
                            }
                        }
                    })
                }
            }
        })
    }
    return back
}

export let checkKing = () => {

}

let checkPatt = (): boolean => {
    let back = false

    return back
}

let repetitionTie = (): boolean => {
    let back = false

    return back
}

let checkDeadPositions = (): boolean => {
    let back = false

    return back
}

