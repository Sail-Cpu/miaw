import * as actionType from "./type"
import {allApps, appById} from "../../requests/app.js";

export const list = () => async (dispatch) => {
    const response = await allApps();
    if(response.data.data){
        dispatch({
            type: actionType.FETCH_DATAS,
            payload: response.data.data
        })
    }
}

export const getApp = (appId) => async (dispatch) => {
    const response = await appById(appId);
    if(response.data.data){
        dispatch({
            type: actionType.GET_APP,
            payload: response.data
        })
    }else{
        dispatch({
            type: actionType.GET_APP_FAILED,
        })
    }

}