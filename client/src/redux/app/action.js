import * as actionType from "./type"
import {allApps, appById} from "../../requests/app.js";

export const list = () => async (dispatch) => {
    const response = await allApps();
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

export const addAppToCollection = (app) => async (dispatch) => {
    dispatch({
        type: actionType.ADD_APP_TO_COLLECTION,
        payload: app
    })
}

export const removeAppFromCollection = (app) => async (dispatch) => {
    dispatch({
        type: actionType.REMOVE_APP_TO_COLLECTION,
        payload: app
    })
}