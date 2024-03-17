import * as actionType from "./type";

const INITIAL_STATE = {
    allApps: [],
    actualApp: {}
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.FETCH_DATAS:
            return {
                ...state,
                allApps: action.payload
            };
        case actionType.GET_APP:
            return {
                ...state,
                actualApp: action.payload
            }
        default:
            return state;
    }
}

export default reducer;