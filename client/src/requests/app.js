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

export const createApp = async (appData) => {
    const {name, description, categorie} = appData;
    console.log(name, description, categorie)
    try {
        const request = await axios.post(`${BASE_LINK}/app`, {
            name,
            description,
            categorie
        })
        return request.data;
    } catch (error) {
        return error.response.data
    }
}