import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GET_API, POST_API, PUT_API } from "../../scrives/api/adminapi";
import { Head } from "../nav-bar";

export function Adminpage() {
    let { id } = useParams([]);
    const reffileImg = useRef();
    const navigator = useNavigate();
    const reffileCircult = useRef();
    const location = useLocation();
    const [name, Setname] = useState();
    const [data, Setdata] = useState([]);
    const [error, Seterror] = useState({
        title: false,
        description: false,
        coding: false,
        link: false,
        products: false,
        hasError: true
    });

    const [input, Setinput] = useState({
        title: "",
        description: "",
        coding: "",
        link: "",
        img: "",
        circult: "",
        Workingdetails: "",
        products: [],
    });

    const handleinput = (event) => {
        Setinput({ ...input, [event.target.name]: event.target.value });
    };

    const filehandler = (name) => {
        Setinput({ ...input, [name]: "" });
    };

    const addproduct = () => {
        Setinput({
            ...input,
            products: [...input.products, { productname: "", productlink: "" }],
        });
    };

    const handleInput = (event, index) => {
        const { name, value } = event.target;
        const updatedProducts = [...input.products];
        updatedProducts[index][name] = value;
        Setinput({ ...input, products: updatedProducts });
    };

    const namehandler = (event) => {
        Setname(event);
        console.log("event", event);
    }
    const Submithandler = async (event) => {
        event.preventDefault();
        let newErrors = { ...error }; // Create a copy of the current error state

        if (input.title === "") {
            newErrors.title = true;
            newErrors.hasError = true;
        } else {
            newErrors.title = false;
            newErrors.hasError = false;
        }
        if (input.link === "") {
            newErrors.link = true;
            newErrors.hasError = true;
        } else {
            newErrors.link = false;
            newErrors.hasError = false;
        }

        if (input.description === "") {
            newErrors.description = true;
            newErrors.hasError = true;
        } else {
            newErrors.description = false;
            newErrors.hasError = false;
        }



        if (input.coding === "") {
            newErrors.coding = true;
            newErrors.hasError = true;
        } else {
            newErrors.coding = false;
            newErrors.hasError = false;
        }

        if (input.products.length === 0) {
            newErrors.products = true;
            newErrors.hasError = true;
        } else {
            newErrors.products = false;
            newErrors.hasError = false;
        }

        Seterror(newErrors); // Update the error state with newErrors

        // If there are no errors, you can proceed with your submission logic
        if (!error.hasError) {
            if (location.pathname === `/admin/id/${id}`) {
                PUT_API(id, input).then((Response) => {
                    navigator('/home')
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                POST_API(input).then((Response) => {
                    navigator('/home')
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    };

    useEffect(() => {
        if (location.pathname === `/admin/id/${id}`) {
            GET_API(id).then((Response) => {
                Setdata(Response.data[0]);
            }).catch((err) => {
                console.log(err);
            })
        }
        document.title = "Admin-THINKSPEAK"
    }, [location.pathname, id])

    useEffect(() => {
        if (data.length !== 0) {
            Setinput(
                {
                    ...input, title: data.title,
                    description: data.description,
                    coding: data.coding,
                    Workingdetails: data.Workingdetails,
                    link: data.link,
                    products: data.product
                }
            )
        }
    }, [data, input])

    const [file, setFile] = useState();
    const [filename, setFilename] = useState();

    const inputHandler1 = () => {
        console.log("input onchange");
        setFile(reffileImg.current.files[0]);
        setFilename(reffileImg.current.files[0].name);
    }

    const inputHandler2 = () => {
        console.log("input onchange");
        setFile(reffileCircult.current.files[0]);
        setFilename(reffileCircult.current.files[0].name);
    }

    useEffect(() => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', filename);
        try {
            axios.post("http://localhost:4500/file/post", formData).then((response) => {
                Setinput({ ...input, [name]: response.data })
                console.log(response);
            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }, [filename, file, input, name])

    return (
        <Fragment>
            <Head />
            <div className="adminpage">
                <div className="welcome">
                    <span>Welcome!</span>
                    <p>Admin</p>
                </div>
                <div className="detail-box">
                    <form action="" onSubmit={event => Submithandler(event)}>
                        <span>Enter the details</span>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            placeholder="please enter YouTube video title"
                            name="title"
                            onChange={handleinput}
                            value={input.title}
                        />
                        {error.title ?
                            <span className="error-register">Please enter the video title</span> : null
                        }
                        <label htmlFor="link">YouTube Link</label>
                        <input
                            type="text"
                            placeholder="please enter YouTube video link"
                            name="link"
                            onChange={handleinput}
                            value={input.link}
                        />
                        {error.link ?
                            <span className="error-register">Please enter the video link</span> : null
                        }
                        {error.img ?
                            <span className="error-register">Please upload thambnail photo</span> : null
                        }
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Enter the description content"
                            onChange={handleinput}
                            name="description"
                            value={input.description}
                        ></textarea>
                        {error.description ?
                            <span className="error-register">Please enter the description</span> : null
                        }
                        <label htmlFor="Workingdetails">Working Details</label>
                        <textarea
                            id="Workingdetails"
                            placeholder="Enter the Working details content"
                            onChange={handleinput}
                            name="Workingdetails"
                            value={input.Workingdetails}
                        ></textarea>
                        <label htmlFor="coding">Enter the coding</label>
                        <textarea
                            placeholder="Enter the coding"
                            name="coding"
                            onChange={handleinput}
                            value={input.coding}
                        ></textarea>
                        {error.coding ?
                            <span className="error-register">Please enter the video coding</span> : null
                        }
                        <table>
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Product link</th>
                                    <th>
                                        <button type="button" onClick={addproduct}>
                                            Add <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {input.products && input.products.map((dat, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                name="productname"
                                                onChange={(e) => handleInput(e, index)}
                                                value={dat.productname}
                                                placeholder="please enter product name"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="productlink"
                                                onChange={(e) => handleInput(e, index)}
                                                value={dat.productlink}
                                                placeholder="please enter product link"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {error.products ?
                            <span className="error-register">Please enter the video product list</span> : null
                        }
                        <div className="thambnail" onClick={() => namehandler("img")}>
                            <span>Upload your thambnail photo</span>
                            <input type="file" ref={reffileImg} onChange={inputHandler1}></input>
                            <i className="fas fa-times" onClick={() => filehandler("img")}></i>
                        </div>
                        <div className="thambnail" onClick={() => namehandler("circult")}>
                            <span>Upload your circult photo</span>
                            <input type="file" ref={reffileCircult} onChange={inputHandler2}></input>
                            <i className="fa-solid fa-x" onClick={() => filehandler("circult")}></i>
                        </div>
                        <div className="submit-btn">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}