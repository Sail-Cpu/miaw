import axios from "axios";

const BASE_LINK = `http://localhost:3000`;
export const allApps = async () => {
    try{
        const request = await axios.get(`${BASE_LINK}/apps`)
        return request.data;
    }catch (error) {
        return error.response.data
    }
}

export const appById = async (appId) => {
    try{
        const request = await axios.get(`${BASE_LINK}/app/${appId}`)
        return request.data;
    }catch (error) {
        return error.response.data
    }
}
export const allCategories = async () => {
    try{
        const request = await axios.get(`${BASE_LINK}/categories`)
        return request.data;
    }catch (error) {
        return error.response.data
    }
}