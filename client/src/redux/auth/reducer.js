import * as actionType from "./type";

const INITIAL_STATE = {
    isLoggedIn: false,
    user:{}
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionType.REGISTER_FIRST_STEP_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default reducer;