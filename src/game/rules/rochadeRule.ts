import { rochadePos } from "../../types/const"
import { Game, BoardHash, Movement } from "../../types/interfaces"
import { Position } from "../../types/type"
import { executeMove } from "../mechanics/execMove"

export let checkForRochade = (game: Game, orgPos: Position, newPos: Position): Game => {
    if (game.gameBoard[orgPos.x + "" + orgPos.y].content === "König" && (orgPos.y === 1 || orgPos.y === 8)) {
        // now only King Positions
        rochadePos.forEach(async pos => {
            if (pos.x === newPos.x && pos.y === newPos.y) {
                let towerPos = { x: newPos.x === 3 ? 1 : 8, y: orgPos.y }
                let newTowerPos = { x: newPos.x === 3 ? newPos.x + 1 : newPos.x - 1, y: orgPos.y }
                console.log("Rochade")
                game = await executeMove(game, towerPos, newTowerPos, true)
            }
        })
    }
    return game

}

export let rochade = (board: BoardHash, log: Movement[], originalPos: Position) => {
    let back: Position[] = []
    let kingPos: Position[] = [{ x: 5, y: 1 }, { x: 5, y: 8 }]
    let towerPos: Position[] = [{ x: 1, y: 1 }, { x: 8, y: 1 }, { x: 1, y: 8 }, { x: 8, y: 8 }]
    if (board[originalPos.x + "" + originalPos.y].content === "König") {
        kingPos.forEach(pos => {
            if (pos.x === originalPos.x && pos.y === originalPos.y) {
                let found = false
                log.forEach(movement => {
                    if (movement.orgPos.x == originalPos.x && movement.orgPos.x === originalPos.y) { found = true }
                })
                if (!found) {
                    towerPos.forEach(tower => {
                        if (tower.y === originalPos.y) {
                            let iter = tower.x < originalPos.x ? tower.x : originalPos.x
                            let bounds = tower.x < originalPos.x ? originalPos.x : tower.x
                            let notEmptyFlag = false
                            for (let i = iter + 1; i < bounds; i++) {
                                if (board[i + "" + originalPos.y].content !== null) notEmptyFlag = true
                            }
                            if (!notEmptyFlag) {
                                back.push({ x: tower.x < originalPos.x ? tower.x + 2 : tower.x - 1, y: tower.y })
                            }
                        }
                    })
                }
            }
        })
    }
    return back
}