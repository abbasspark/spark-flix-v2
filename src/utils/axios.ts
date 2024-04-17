import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
})

const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
    }
    console.error('Config:', error.config);
}

export const fetchData = async <T>(path: string, params?: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await instance.get(path, { params });
        return response.data;
    } catch (error: any) {
        handleAxiosError(error);
        return [] as T;
    }
}