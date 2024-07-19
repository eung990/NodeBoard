import axios from "axios";

export  function loginUser(bodyData) {
    const req =  axios.post("http://localhost:3040/api/users/login", bodyData)
    .then(res  => res.data)

    console.log("Email ==========> ",bodyData.email)
    console.log("password ==========> ",bodyData.password)

    return {
        type: "LOGIN_USER",
        payload: req
    }
}