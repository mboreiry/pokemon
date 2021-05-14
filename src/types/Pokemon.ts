
import Info from "./Info";

export default interface Pokemon {
    id: number;
    order: number;
    weight: string;
    name: string;
    abilities: { ability: Info }[];
    forms: Info[];
    moves: { move: Info }[];
    types: { type: Info }[];
    stats: { stat: Info }[];
}