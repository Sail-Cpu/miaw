import * as actionType from "./type"
//request
import {login, register} from "../../requests/auth.js";
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