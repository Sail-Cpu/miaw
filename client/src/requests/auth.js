import axios from "axios";

const BASE_LINK = import.meta.env.VITE_APP_API_URL;

export const userExist = async (userData) => {
    const {username, email} = userData;
    try{
        const request = await axios.get(`${BASE_LINK}/user?username=${username}&email=${email}`, {
            headers: {
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        })
        return request.data;
    }catch (error){
        return false;
    }
}

function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export const register = async (userData) => {
    const {username, email, password, os, job, image} = userData;

    if(image && username.length > 0 && email.length > 0 && password.length > 0 && os.length > 0 && job !== 0){

        try{
            const formData = new FormData();
            const renamedFile = new File([image], `user_${username.replaceAll(' ', '_').toLowerCase()}.${getFileExtension(image.name)}`);
            formData.append('image', renamedFile);
            const imageResponse = await axios.post(`${BASE_LINK}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "x-api-key": import.meta.env.VITE_APP_API_KEY
                }
            });
            const request = await axios.post(`${BASE_LINK}/signup`, {
                username,
                email,
                password,
                os,
                job,
                picture: renamedFile.name
            }, {
                headers: {
                    "x-api-key": import.meta.env.VITE_APP_API_KEY
                }
            })
            return request.data;
        }catch (error){
            return error?.response?.data
        }
    }else{
        return {success: false, message: "all fields must be completed"}
    }
}

export const login = async (userData) => {
    const {username, password} = userData;
    if(username.length > 0 && password.length > 0){
        try{
            const request = await axios.post(`${BASE_LINK}/signin`, {
                nameEmail: username,
                password: password
            }, {
                headers: {
                    "x-api-key": import.meta.env.VITE_APP_API_KEY
                }
            })
            return request.data
        }catch (error){
            return error.response.data
        }
    }else{
        return {message: "all fields must be completed"}
    }
}

export const favRequest = async (userId, shortcutId, add) => {
    try{
        const request = await axios.post(`${BASE_LINK}/favorite/${add}`, {
            user_id: userId,
            shortcut_id: shortcutId
        }, {
            headers: {
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        })
        return request.data
    }catch (error){
        return error.response.data
    }
}

export const appRequest = async (userId, appId, add) => {
    try{
        const request = await axios.post(`${BASE_LINK}/addAppToCollection/${add}`, {
            user_id: userId,
            app_id: appId
        }, {
            headers: {
                "x-api-key": import.meta.env.VITE_APP_API_KEY
            }
        })
        return request.data
    }catch (error){
        return error.response.data
    }
}