import * as actionType from "./type"
import {allApps} from "../../requests/app.js";

export const list = () => async (dispatch) => {
    const response = await allApps();
    if(response.data.data){
        dispatch({
            type: actionType.FETCH_DATAS,
            payload: response.data.data
        })
    }
}