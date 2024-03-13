import * as actionType from "./type";

const INITIAL_STATE = {
    isLoggedIn: false,
    user:{}
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionType.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };
        case actionType.REGISTER_FAILED:
            return state;
        default:
            return state;
    }
}

export default reducer;