import axios from "axios";
import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER
}from './types'

export function loginUser(bodyData) {
    const res = axios.post("/api/users/login", bodyData)
        .then(res => res.data)

    console.log("res.data ==========> ", res.data)
    console.log("password ==========> ", bodyData.password)

    return {
        type: LOGIN_USER,
        payload: res
    }
}

export function SignUpUser(bodyData) {
    const res = axios.post("/api/users/signUp", bodyData)
        .then(res => res.data)

    console.log("Email ==========> ", bodyData.email)
    console.log("password ==========> ", bodyData.password)

    return {
        type: SIGNUP_USER,
        payload: res
    }
}

export function userAuth() {
    const res = axios.get("/api/users/auth")


    return {
        type: AUTH_USER,
        payload: res
    }
}
