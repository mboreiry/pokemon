
import Info from "./Info";

export default interface Pokemon {
    id: number;
    order: number;
    weight: string;
    name: string;
    abilities: [];
    forms: Info[];
    moves: [];
    types: [];
    stats: [];
}