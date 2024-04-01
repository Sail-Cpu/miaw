import axios from "axios";

const BASE_LINK = `http://localhost:3000`;
export const allApps = async () => {
    try{
        const request = await axios.get(`${BASE_LINK}/apps`)
        if(request.data.data){
            return request;
        }
    }catch (error) {
        return error?.response?.data?.message
    }
}

export const appById = async (appId) => {
    try{
        const request = await axios.get(`${BASE_LINK}/app/${appId}`)
        if(request.data.data && request.data.chapters){
            return request;
        }
    }catch (error) {
        return error?.response
    }
}