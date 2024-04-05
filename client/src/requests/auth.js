import axios from "axios";

const BASE_LINK = `http://localhost:3000`;

export const userExist = async (userData) => {
    const {username, email} = userData;
    try{
        const request = await axios.get(`${BASE_LINK}/user?username=${username}&email=${email}`)
        return request.data.result;
    }catch (error){
        return false;
    }
}

export const register = async (userData) => {
    const {username, email, password, os, job} = userData;
    if(username.length > 0 && email.length > 0 && password.length > 0 && os.length > 0 && job.length > 0){
        try{
            const request = await axios.post(`${BASE_LINK}/signup`, {
                username,
                email,
                password,
                os,
                job
            })
            return request.data;
        }catch (error){
            return error?.response?.data
        }
    }else{
        return {message: "all fields must be completed"}
    }
}

export const login = async (userData) => {
    const {username, password} = userData;
    if(username.length > 0 && password.length > 0){
        try{
            const request = await axios.post(`${BASE_LINK}/signin`, {
                nameEmail: username,
                password: password
            })
            return request.data
        }catch (error){
            return error.response.data
        }
    }else{
        return {message: "all fields must be completed"}
    }
}