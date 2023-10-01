import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Storedata, admindata } from "../scrives/storage";
import { authication } from "../scrives/auth";
import { SigninApi, LoginApi } from "../scrives/api/Apifirebase";

export default function Register() {
    const urllocation = useLocation();
    const navigator = useNavigate();
    const initialState = {
        Email: { required: false },
        Password: { required: false },
        User: { required: false },
        checkbox: { required: false },
        lPassword: { required: false },
        lUser: { required: false },
        customError: null
    };

    const [error, setError] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [lloading, setlLoading] = useState(false);

    const [input, setInput] = useState({
        Email: "",
        Password: "",
        User: "",
        lPassword: "",
        lUser: "",
        checkbox: false
    });

    const InputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const CheckboxHandler = () => {
        setInput({ ...input, checkbox: !input.checkbox });
    };

    const handleSubmit = (event) => {
        console.log("handle submit");
        event.preventDefault();
        let errors = initialState;
        let hasError = false;
        if (input.Email === "") {
            errors.Email.required = true;
            hasError = true;
        }
        if (input.User === "") {
            errors.User.required = true;
            hasError = true;
        }
        if (input.Password === "") {
            errors.Password.required = true;
            hasError = true;
        }
        if (input.checkbox === false) {
            errors.checkbox.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true);
            SigninApi(input)
                .then((response) => {
                    console.log(response);
                    Storedata(response.data.idToken);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.data.error.message === "EMAIL_EXISTS") {
                        setError({ ...error, customError: "Already this email id used" });
                    } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
                        setError({ ...error, customError: "Password should be at least 6 characters" });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        setError(errors);
    }

    const lhandleSubmit = (event) => {
        event.preventDefault();
        let errors = initialState;
        let hasError = false;

        if (input.lUser === "") {
            errors.lUser.required = true;
            hasError = true;
        }
        if (input.lPassword === "") {
            errors.lPassword.required = true;
            hasError = true;
        }

        if (!hasError) {
            setlLoading(true);
            LoginApi(input)
                .then((response) => {
                    Storedata(response.data.idToken);
                    admindata(response.data.localId)
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.data.error.message === "EMAIL_EXISTS") {
                        setError({ ...error, customError: "Already this email id used" });
                    } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
                        setError({ ...error, customError: "Password should be at least 6 characters" });
                    }
                    if (err.response.data.error.message === "EMAIL_NOT_FOUND") {
                        setError({ ...error, customError: "Invalid Email" });
                    } else if (err.response.data.error.message === "INVALID_PASSWORD") {
                        setError({ ...error, customError: "INVALID_PASSWORD" })
                    }
                })
                .finally(() => {
                    setlLoading(false);
                });
        }

        setError(errors);
    }

    let [loginbtnstate, Setloginbtnstate] = useState(false);

    const loginhandler = () => {
        Setloginbtnstate(true);
    }

    const signinhandler = () => {
        Setloginbtnstate(false);
    }

    useEffect(() => {
        if (urllocation.pathname === '/register/signin') {
            Setloginbtnstate(false);
        } else if (urllocation.pathname === '/register/login') {
            Setloginbtnstate(true);
        }
    }, [urllocation.pathname]);

    if (authication()) {
        navigator('/home')
    }

    return (
        <Fragment>
            <div className="registration" id="myconfig">
                <div className="mycontent">
                    <div className="myoverlay"></div>
                    <Link to={'/home'}><i class="fa-solid fa-house"></i></Link>
                    <img className="mybackground" src="/material/bg-1.jpg" alt="" />
                </div>
                <div className="contain">
                    <div className="toggle-btn">
                        <button className={`signin-btn ${loginbtnstate ? "" : "black-background"}`} onClick={signinhandler}><span></span> SIGN IN</button>
                        <button className={`login-btn ${loginbtnstate ? "black-background" : ""}`} onClick={loginhandler}><span></span> LOG IN</button>
                    </div>
                    <div className={`box ${loginbtnstate ? "left-movement" : "right-movement"}`}>
                        <form action="" id="login" onSubmit={lhandleSubmit}>
                            <div className={`box-img`}>
                                <div className="inputname">
                                    <i className="fa fa-user"></i>
                                    <input type="text" className="name" name="lUser" placeholder="username or email id" onChange={InputHandler} />
                                </div>
                                {error.lUser.required ? (
                                    <span className="error-register">*Please center your username or email</span>) : null
                                }
                                <div className="inputpassword">
                                    <i className="fa fa-key"></i>
                                    <input type="password" className="password" name="lPassword" placeholder="password" onChange={InputHandler} />
                                </div>
                                {error.lPassword.required ? (
                                    <span className="error-register">*Please center your password</span>) : null
                                }
                                {error.customError ?
                                    (<span className="error-register">{error.customError}</span>) : null
                                }
                                <div className="submit-register">
                                    {lloading ? (
                                        <div class="loader"></div>) : null
                                    }
                                    <button type="submit" disabled={lloading}><span></span>LOG IN</button>
                                </div>
                            </div>
                        </form>
                        <form action="" id="signin" onSubmit={handleSubmit}>
                            <div className="box-form">
                                <div className="inputname">
                                    <i className="fa fa-user"></i>
                                    <input type="text" className="name" name="User" placeholder="name" onChange={InputHandler} />
                                </div>
                                {error.User.required ? (
                                    <span className="error-register">*Please center your name</span>) : null
                                }
                                <div className="inputemail">
                                    <i className="fa fa-address-card"></i>
                                    <input type="email" name="Email" className="email" placeholder="email" onChange={InputHandler} />
                                </div>
                                {error.Email.required ? (
                                    <span className="error-register">*Please center your email</span>) : null
                                }
                                <div className="inputpassword">
                                    <i className="fa fa-key"></i>
                                    <input type="password" name="Password" className="password" placeholder="password" value={input.Password} onChange={InputHandler} />
                                </div>
                                {error.Password.required ?
                                    (<span className="error-register">*Please center your password</span>) : null
                                }
                                {error.customError ?
                                    (<span className="error-register">{error.customError}</span>) : null
                                }
                                <div className="submit-register">
                                    {loading ? (
                                        <div class="loader"></div>) : null
                                    }
                                    <button type="submit" disabled={loading}><span></span>SIGN IN</button>
                                </div>
                                <div className="content">
                                    <div className="check">
                                        <div className="check-box">
                                            <input type="checkbox" name="checkbox" id="check" checked={input.checkbox} onChange={CheckboxHandler} />
                                            <p>I agree with the terms and conditions</p>
                                        </div>
                                        {error.checkbox.required ?
                                            (<span className="error-register">*Please tick the check box</span>) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}