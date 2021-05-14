
import Info from "./Info";

export interface Page {
    count: number;
    next: string;
    previous: string;
    results: Info[];
}