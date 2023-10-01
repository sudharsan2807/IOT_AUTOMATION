import { getadmin, getdata } from "./storage";

export const authication = () => {
    return getdata() !== null ? true : false
}

export const adminauth = () => {
    return getadmin() === "J57vfSaalgTihqaTElhHf6vhpgq2" ? true : false
}