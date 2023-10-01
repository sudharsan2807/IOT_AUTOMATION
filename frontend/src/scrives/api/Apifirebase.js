import axios from "axios"

const baseurl = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "AIzaSyAkUvu6o15oihN0xgNu7pff7fmCpEPw84Y";

export const SigninApi = (data) => {
    let info = {
        email: data.Email,
        password: data.Password,
        displayName: data.User
    }
    console.log(info);
    return axios.post(`${baseurl}signUp?key=${API_KEY}`, info)
}

export const LoginApi = (data) => {
    let info = {
        email: data.lUser,
        password: data.lPassword,
    }
    return axios.post(`${baseurl}signInWithPassword?key=${API_KEY}`, info);
}

export const GETapi = (data) => {
    let info = {
        "idToken": data
    }
    return axios.post(`${baseurl}lookup?key=${API_KEY}`, info)
}

export const MESS_SEND = (data) => {
    return axios.get(`https://api.telegram.org/bot6515036773:AAHv1M1ejZDezzJwZ07yNPjt9dg80qxthsE/sendMessage?chat_id=@IOT_WED_ENTERY&text=${data}`)
}