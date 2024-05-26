import * as actionType from "./type"
//request
import {login, register, favRequest, appRequest} from "../../requests/auth.js";
export const signUp = (userData) => async (dispatch) => {
    const response = await register(userData);
    if(response?.success){
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

export const favAction = (data) => async (dispatch) => {
    const  {userId, shortcutId, add} = data;
    const response = await favRequest(userId, shortcutId, add);
    if(response.success){
        dispatch({
            type: actionType.UPDATE_USER,
            payload: response.result,
            modif: "shortcuts"
        })
    }
    return response;
}

export const addAppToCollection = (data) => async (dispatch) => {
    const  {userId, appId, add} = data;
    const response = await appRequest(userId, appId, add);
    if(response.success) {
        dispatch({
            type: actionType.UPDATE_USER,
            payload: response.result,
            modif: "apps"
        })
    }
}