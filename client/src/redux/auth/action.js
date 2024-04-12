import * as actionType from "./type"
//request
import {login, register, addToMyFav} from "../../requests/auth.js";
import shortcut from "../../components/Shortcut.jsx";
export const signUp = (userData) => async (dispatch) => {
    const response = await register(userData);
    if(response.success){
        dispatch({
            type: actionType.REGISTER_SUCCESS,
            payload: response.result
        })
    }else{
        dispatch({
            type: actionType.REGISTER_FAILED
        })
    }
    return response;
}

export const SignIn = (userData) => async (dispatch) => {
    const response = await login(userData);
    console.log(response)
    if(response.success){
        dispatch({
            type: actionType.REGISTER_SUCCESS,
            payload: response.result
        })
    }else{
        dispatch({
            type: actionType.REGISTER_FAILED
        })
    }
    return response;
}

export const addToFav = (data) => async (dispatch) => {
    const  {userId, shortcutId} = data;
    const response = await addToMyFav(userId, shortcutId);
    if(response.success){
        dispatch({
            type: actionType.UPDATE_USER,
            payload: response.result,
            modif: "shortcuts"
        })
    }
    return response;
}