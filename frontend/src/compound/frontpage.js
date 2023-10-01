import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MESS_SEND } from "../scrives/api/Apifirebase";

export function Front() {
    const enteryhandler = () => {
        MESS_SEND("Entering to youtube vlog page").catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        document.title = "Register-THINKSPEAK"
    }, [])
    return (
        <Fragment>
            <div class="overlay"></div>
            <video autoplay loop plays-inline class="myvideo">
                <source src="/material/backgroundvid.mp4" type="video/mp4" />
            </video>
            <div class="myregister">
                <div class="myskip">
                    <Link to={'/home'}><button onClick={enteryhandler}><span></span>SKIP</button></Link>
                </div>
                <div class="mycontent">
                    <div class="mylogo"><img src="/material/logo.png" alt="" /></div>
                    <div class="mybtn">
                        <Link to={'register/login'}><button onClick={enteryhandler}><span></span>LOG IN</button></Link>
                        <Link to={'register/signin'}><button onClick={enteryhandler}><span></span>SIGN IN</button></Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}