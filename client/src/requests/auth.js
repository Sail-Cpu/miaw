import axios from "axios";

const BASE_LINK = `http://localhost:3000`;

export const userExist = async (userData) => {
    const {username, email} = userData;
    try{
        const request = await axios.get(`${BASE_LINK}/user?username=${username}&email=${email}`)
        return request.data.data;
    }catch (error){
        console.log(error);
        return false;
    }
}

export const register = async (userData) => {
    const {username, email, password} = userData;

    try{
        const request = await axios.post(`${BASE_LINK}/signup`, {
            username,
            email,
            password
        })
        if(request.data.data){
            return request.data;
        }
    }catch (error){
        console.log(error);
        return error?.response?.data?.message;
    }
}