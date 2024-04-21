import { ApiResponse } from "../types/tmdb.type";
import { fetchData } from "./axios";


export const fetch = async<T, K extends string = 'results'>(endpoint: string, queryParams: Record<string, any> = {}): Promise<ApiResponse<T, K>> => {
    try {
        return await fetchData<ApiResponse<T, K>>(endpoint, queryParams);
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return {
            results: []
        } as ApiResponse<T, K>;
    }
};