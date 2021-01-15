import { forEachAsync } from "../../async"
import { rochadePos } from "../../types/const"
import { Game, BoardHash, Movement } from "../../types/interfaces"
import { Position } from "../../types/type"
import { executeMove } from "../mechanics/execMove"
import { buildKey } from "../tools/tools"
/**
 *  checks if the rochade rule is activated
 *
 * @param {Game} game
 * @param {Position} orgPos
 * @param {Position} newPos
 * @return {*}  {Promise<Game>}
 */
export let checkForRochade = async (game: Game, orgPos: Position, newPos: Position): Promise<Game> => {
    // checks if the moved piece is a king
    if (game.gameBoard[orgPos.x + "" + orgPos.y].content === "König" && (orgPos.y === 1 || orgPos.y === 8)) {
        // goes through all rochade Positions
        rochadePos.forEach(async pos => {
            // checks if the position to be moved to is a rochade position
            if (pos.x === newPos.x && pos.y === newPos.y) {
                // determines pos for after rochade
                let towerPos = { x: newPos.x === 3 ? 1 : 8, y: orgPos.y }
                let newTowerPos = { x: newPos.x === 3 ? newPos.x + 1 : newPos.x - 1, y: orgPos.y }
                console.log("Rochade")
                game = await executeMove(game, towerPos, newTowerPos, true)
            }
        })
    }
    return game

}
/**
 * Switches tower in king after rochade rules
 *
 * @param {BoardHash} board
 * @param {Movement[]} log
 * @param {Position} pos
 * @return {*}  {Promise<Position[]>}
 */
export let rochade = async (board: BoardHash, log: Movement[], pos: Position): Promise<Position[]> => {
    let back: Position[] = []
    let kingPositions: Position[] = [{ x: 5, y: 1 }, { x: 5, y: 8 }]
    let towerPositions: Position[] = [{ x: 1, y: 1 }, { x: 8, y: 1 }, { x: 1, y: 8 }, { x: 8, y: 8 }]
    // checks if the game piece to be move is a king
    if (board[await buildKey(pos)].content === "König") {
        // goes through all king start position
        kingPositions.forEach(async pos => {
            // checks if the king is on its start position
            if (pos.x === pos.x && pos.y === pos.y) {
                let found = false
                // if the king ever moved // checks if a movement back on the start exits
                log.forEach(movement => {
                    if (movement.orgPos.x == pos.x && movement.orgPos.x === pos.y) { found = true }
                })
                // if there is no prior movment
                if (!found) {
                    // goes through all tower start positions
                    await forEachAsync(towerPositions, async towerPos => {
                        // check if the tower is in the same row as the tower
                        if (towerPos.y === pos.y) {
                            // if the tower ever moved // checks if a movement back on the start exits
                            log.forEach(movement => {
                                if (movement.orgPos.x == pos.x && movement.orgPos.x === pos.y) { found = true }
                            })
                            // if there is no prior movment
                            if (!found) {
                                // checks if the tower is on the left side and sets left bound
                                let iter = towerPos.x < pos.x ? towerPos.x : pos.x
                                // checks if the tower is on the left side and sets right bound
                                let bounds = towerPos.x < pos.x ? pos.x : towerPos.x
                                let emptyFlag = true
                                // Checks if all positions between king and tower are free
                                for (let i = iter + 1; i < bounds; i++) {
                                    if (board[i + "" + pos.y].content !== null) emptyFlag = false
                                }
                                // if its empty pushes position
                                if (emptyFlag) back.push({ x: towerPos.x < pos.x ? towerPos.x + 2 : towerPos.x - 1, y: towerPos.y })
                            }

                        }
                    })

                }
            }
        })
    }
    return back
}