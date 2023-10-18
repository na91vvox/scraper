import { ScrapedItem } from "./ScrapedItem";

export interface QueryResponse {
    items: ScrapedItem[];
    currentPage: number;
    totalItemsCount: number,
    totalPagesCount: number;
    itemsPerPageCount: number;
}
