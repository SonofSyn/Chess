import { determinPossibleMove } from "../determinPossibleMoves"
import { BoardHash, PossibleMove } from "../../../types/interfaces"
import { Position } from "../../../types/type"
/**
 * All Positions a king game piece can make on a given position and gameboard
 *
 * @param {Position} pos
 * @param {BoardHash} board
 * @return {*}  {Promise<Position[]>}
 */
export let king = async (pos: Position, board: BoardHash):Promise<Position[]> => {
    let back: Position[] = []
    for (let i = -1; i <= 1; i++) {
        //left/right
        let temp: PossibleMove = await determinPossibleMove(pos, { x: i, y: 0 }, board)
        if (temp.pos !== null) back.push(temp.pos)
        //up/down
        temp = await determinPossibleMove(pos, { x: 0, y: i }, board)
        if (temp.pos !== null) back.push(temp.pos)
        //upright/downright
        temp = await determinPossibleMove(pos, { x: i, y: i }, board)
        if (temp.pos !== null) back.push(temp.pos)
        //upleft/downleft
        temp = await determinPossibleMove(pos, { x: -i, y: i }, board)
        if (temp.pos !== null) back.push(temp.pos)
    }
    return back
}