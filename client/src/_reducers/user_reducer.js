import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER
} from "../_actions/types"


export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }


        case SIGNUP_USER:
            return { ...state, signUpSuccess: action.payload }

        case AUTH_USER:
            return { ...state, authSuccess: action.payload }
        default:
            return state;
    }
}