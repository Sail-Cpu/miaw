import * as actionType from "./type";

const INITIAL_STATE = {
    isLoggedIn: false,
    user: {
        user_id: 0,
        email: "",
        job: "",
        role: "user",
        password: "",
        os: "",
        shortcuts: [],
        username: "",
        picture: "",
        apps: [],
        token: ""
    }
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionType.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };
        case actionType.UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.modif]: action.payload
                }
            };
        case actionType.REGISTER_FAILED:
            return state;
        case actionType.DISCONNECT:
                return INITIAL_STATE;
        default:
            return state;
    }
}

export default reducer;