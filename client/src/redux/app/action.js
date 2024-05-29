import * as actionType from "./type"
import {allApps, appById} from "../../requests/app.js";

export const list = () => async (dispatch) => {
    const response = await allApps();
    console.log(response)
    if(response.success){
        dispatch({
            type: actionType.FETCH_DATAS,
            payload: response.result
        })
    }
}

export const getApp = (appId) => async (dispatch) => {
    const response = await appById(appId);
    if(response.success){
        dispatch({
            type: actionType.GET_APP,
            payload: response.result
        })
    }else{
        dispatch({
            type: actionType.GET_APP_FAILED,
        })
    }
}