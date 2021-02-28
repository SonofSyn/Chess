import { ChessPiece, Position } from "./type"

export const axis: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

export const startSet: ChessPiece[][] = [
    ["Turm", "Springer", "Laeufer", "Koenigin", "Koenig", "Laeufer", "Springer", "Turm"],
    ["Bauer", "Bauer", "Bauer", "Bauer", "Bauer", "Bauer", "Bauer", "Bauer"]
]

export const rochadePos:Position[]=[
    {x:3,y:1},
    {x:7,y:1},
    {x:3,y:8},
    {x:7,y:8},
]