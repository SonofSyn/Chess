import { axis, startSet } from "../types/const";
import { BoardHash } from "../types/interfaces";

/**
 * Creates a chessboard with start setup
 *
 * @return {*}  {Chessboard}
 */
export let initBoard = (): BoardHash => {
    let hash: BoardHash = {}
    axis.forEach((x, xIx) => {
        axis.forEach((y, yIx) => {
            if (yIx === 0 || yIx === 7) {
                hash[x + "" + y] = {
                    pos: { x, y },
                    content: startSet[0][xIx],
                    player: yIx === 0 ? "weiß" : "schwarz"
                }
            }
            else if (yIx === 1 || yIx === 6) {
                hash[x + "" + y] = {
                    pos: { x, y },
                    content: startSet[1][xIx],
                    player: yIx === 1 ? "weiß" : "schwarz"
                }
            }
            else hash[x + "" + y] = { pos: { x, y }, content: null, player: "" }
        })
    })
    return hash
}
