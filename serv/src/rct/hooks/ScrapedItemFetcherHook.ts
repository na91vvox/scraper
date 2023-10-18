import { QueryResponse } from "../model/FetchResponse";
import axios from "axios";

const useScrapedItemFetcher = () => {

    async function fetch(page: number): Promise<QueryResponse> {
        return (await axios.get(`http://127.0.0.1:8080/query-scraps?page=${page}`)).data;
    }

    return {
        fetch,
    };
};

export default useScrapedItemFetcher;
