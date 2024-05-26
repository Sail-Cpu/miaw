import * as actionType from "./type";

const INITIAL_STATE = {
    userApps: [],
    allApps: [],
    actualApp: {
        data: {
            app_id: 0,
            app_name: "",
            app_description: "",
            app_logo: "",
            app_images: [],
            categorie_id: 0
        },
        chapters: [
            {
                chapter_id: 1,
                chapter_name: "",
                shortcuts: []
            }
        ]
    }
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.FETCH_DATAS:
            return {
                ...state,
                allApps: action.payload,
            };
        case actionType.GET_APP:
            return {
                ...state,
                actualApp: action.payload
            };
        case actionType.ADD_APP_TO_COLLECTION:
            return {
                ...state,
                userApps: state.userApps.some(app => app.app_id === action.payload.app_id)
                    ? state.userApps
                    : [...state.userApps, action.payload]
            };
        case actionType.REMOVE_APP_TO_COLLECTION:
            return {
                ...state,
                userApps: state.userApps.filter(app => app.app_id !== action.payload.app_id)
            };
        case actionType.GET_APP_FAILED:
            return{
                ...state,
                actualApp: INITIAL_STATE.actualApp
            };
        default:
            return state;
    }
}

export default reducer;