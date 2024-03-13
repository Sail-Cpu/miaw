import * as actionType from "./type"
//request
import {login, register} from "../../requests/auth.js";
export const signUp = (userData) => async (dispatch) => {
    const response = await register(userData);
    if(response.data){
        dispatch({
            type: actionType.REGISTER_SUCCESS,
            payload: response.data
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
    if(response.data){
        dispatch({
            type: actionType.REGISTER_SUCCESS,
            payload: response.data
        })
    }else{
        dispatch({
            type: actionType.REGISTER_FAILED
        })
    }
    return response;
}