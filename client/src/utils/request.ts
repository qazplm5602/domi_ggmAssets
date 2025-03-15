import axios, { AxiosRequestConfig } from 'axios';

export async function request<T>(uri: string, config?: AxiosRequestConfig<T>) {
    return await axios<T>(`/api${uri}`, config);
}