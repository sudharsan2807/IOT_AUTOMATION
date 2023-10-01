
export const Storedata = (getid) => {
    return localStorage.setItem('idyoutube', getid)
}

export const getdata = () => {
    return localStorage.getItem('idyoutube')
}

export function removedata() {
    try {
        localStorage.removeItem('idyoutube')
        localStorage.removeItem('admin')
    }
    catch (err) {
        console.log(err);
    }
}

export const admindata = (getid) => {
    return localStorage.setItem('admin', getid)
}

export const getadmin = () => {
    return localStorage.getItem('admin')
}