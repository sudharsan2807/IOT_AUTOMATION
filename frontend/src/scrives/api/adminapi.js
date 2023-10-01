import axios from "axios"

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

    return axios.post("http://localhost:4500/details/post", info)
}

export const GET_API = (id) => {
    return axios.get(`http://localhost:4500/details/get/${id}`)
}

export const PUT_API = (id, data) => {
    return axios.put(`http://localhost:4500/details/upd/${id}`, data)
}

export const GET_API_ALL = () => {
    return axios.get('http://localhost:4500/details/get/all');
}

export const DELETE_API = (id) => {
    return axios.delete(`http://locslhost:4500/details/delete/${id}`)
}

export const SEARCH_API = (searchTerm) => {
    return axios.get(`http://localhost:4500/details/search?search=${searchTerm}`)
}