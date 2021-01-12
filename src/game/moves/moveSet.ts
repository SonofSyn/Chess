import { MoveTemplate } from "../../types/interfaces"
import { bishop } from "./pieces/bishop"
import { king } from "./pieces/king"
import { knight } from "./pieces/knight"
import { pawn } from "./pieces/pawn"
import { queen } from "./pieces/queen"
import { tower } from "./pieces/tower"

export const MoveSet: MoveTemplate = {
    "Bauer": pawn,
    "Turm": tower,
    "Springer": knight,
    "Läufer": bishop,
    "Königin": queen,
    "König": king,
}