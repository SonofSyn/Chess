import { axis, startSet } from "../types/const";
import { BoardHash } from "../types/interfaces";

/**
 * Creates a chessboard with start setup
 *
 * @return {*}  {Chessboard}
 */
export let initBoard = async (): Promise<BoardHash> => {
    let hash: BoardHash = {}
    // goes through x axis
    axis.forEach((x, xIx) => {
        // goes through y axis
        axis.forEach((y, yIx) => {
            // checks if its on starting height of player
            if (yIx === 0 || yIx === 7) {
                // fill backrow of board
                hash[x + "" + y] = {
                    pos: { x, y },
                    content: startSet[0][xIx],
                    player: yIx === 0 ? "weiß" : "schwarz"
                }
            }
            // fill pawn row
            else if (yIx === 1 || yIx === 6) {
                hash[x + "" + y] = {
                    pos: { x, y },
                    content: startSet[1][xIx],
                    player: yIx === 1 ? "weiß" : "schwarz"
                }
            }
            // else fill empty
            else hash[x + "" + y] = { pos: { x, y }, content: null, player: "" }
        })
    })
    return hash
}