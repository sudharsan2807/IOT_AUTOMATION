import React, { Fragment, useEffect, useState } from "react";
import { getdata, removedata } from "../scrives/storage";
import { GETapi } from "../scrives/api/Apifirebase";
import { Link } from "react-router-dom";

export function Accountpopup(props) {
    const [user, setUser] = useState([]);
    const [allow, Setallow] = useState(false)
    let id = getdata();
    useEffect(() => {
        GETapi(id).then((response) => {
            setUser(response.data.users[0]);
            Setallow(true);
            console.log(response);
        }).catch((err) => {
            console.log(err);
            Setallow(false)
        })
    }, [])

    const logouthandler = () => {
        removedata();
        window.location.reload();
    }

    const closebtn = () => {
        window.location.reload();
    }

    return (
        <Fragment>
            <div className="blur-backgournd"></div>
            <div className="Account">
                <i class="fa-solid fa-xmark" id="close" onClick={closebtn}></i>
                <i class="fa-solid fa-circle-user"></i>
                <span>{allow ? user.displayName : "No UserName"}</span>
                <span>{allow ? user.email : "No email"}</span>
                {allow ?
                    <button onClick={logouthandler}>LOGOUT</button> :
                    <Link to={'/register'}><button onClick={props.close}>REGISTER</button></Link>
                }
            </div>
        </Fragment>
    )
}