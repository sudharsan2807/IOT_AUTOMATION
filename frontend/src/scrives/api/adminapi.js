import axios from "axios"

const Base_URL = "https://youtube-video-y7dm.onrender.com";
export const POST_API = (data) => {
    let info = {
        title: data.title,
        img: data.img,
        link: data.link,
        description: data.description,
        Workingdetails: data.Workingdetails,
        coding: data.coding,
        circult: data.circult,
        product: data.products
    }

    return axios.post(`${Base_URL}/details/post`, info)
}

export const GET_API = (id) => {
    return axios.get(`${Base_URL}/details/get/${id}`)
}

export const PUT_API = (id, data) => {
    return axios.put(`${Base_URL}/details/upd/${id}`, data)
}

export const GET_API_ALL = () => {
    return axios.get(`${Base_URL}/details/get/all`);
}

export const DELETE_API = (id) => {
    return axios.delete(`${Base_URL}/details/delete/${id}`)
}

export const SEARCH_API = (searchTerm) => {
    return axios.get(`${Base_URL}/details/search?search=${searchTerm}`)
}