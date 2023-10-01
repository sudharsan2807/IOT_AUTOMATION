import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DELETE_API, GET_API } from "../../scrives/api/adminapi";
import { adminauth } from "../../scrives/auth";
import { Head } from "../nav-bar";

export function Viewpage() {
    const [data, Setdata] = useState([]);
    const [filter, Setfilter] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        GET_API(id)
            .then((Response) => {
                Setdata(Response.data[0]);
                setTextareaValue(Response.data[0].coding);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const filterhandler = () => {
        Setfilter(!filter)
    }
    const deletehandler = () => {
        DELETE_API(id).catch((err) => { console.log(err); });
    };

    const [textareaValue, setTextareaValue] = useState("");

    const copyText = () => {
        try {
            navigator.clipboard.writeText(textareaValue);
        } catch (err) {
            console.error("Unable to copy text: ", err);
        }
    };
    return (
        <Fragment>
            <Head filter={filterhandler} />
            <div className="view-page">
                <div className="top-arrow">
                    <a href="#navbar">
                        <i className="fa-solid fa-arrow-up"></i>
                    </a>
                </div>
                <div className={`left-box ${filter ? "open-filter" : ""}`}>
                    <div className="filter-box">
                        <span>Content-Filter<i class="fa-solid fa-xmark" onClick={filterhandler}></i></span>
                        <ul>
                            <li>
                                <a href="#video">Video</a>
                            </li>
                            <li>
                                <a href="#description">Description</a>
                            </li>
                            <li>
                                <a href="#coding">Coding</a>
                            </li>
                            <li>
                                <a href="#required">Material</a>
                            </li>
                            <li>
                                <a href="#circult">Circuit</a>
                            </li>
                            {adminauth() ?
                                <Fragment>
                                    <Link to={`/admin/id/${data._id}`}>
                                        <li style={{ display: "flex", gap: "1rem" }}>
                                            <i className="fa-regular fa-pen-to-square"></i>Edit
                                        </li>
                                    </Link>
                                    <li onClick={deletehandler}>Delete</li>
                                </Fragment>
                                : null
                            }
                            <li>
                                <img src="/material/social-media/youtubr.png" onClick={() => { window.location.href = "https://youtube.com/@thinkarduino6078?si=LdBJdpsBNpI15Nst" }} alt="" />
                                <img src="/material/social-media/instagram.png" alt="" />
                                <img src="/material/social-media/facebook.png" alt="" />
                                <img src="/material/social-media/twiiter.png" alt="" />
                            </li>
                        </ul>
                    </div>
                    <div className="about-us">
                        <div className="about">
                            <span>Think Arduino</span>
                            <p>
                                Website done by <br />
                                <span>V Sudharsan</span>
                            </p>
                        </div>
                        <div className="social-media">
                            <div className="icon-box" onClick={() => { window.location.href = "https://youtube.com/@thinkarduino6078?si=LdBJdpsBNpI15Nst" }}>
                                <img src="/material/social-media/youtubr.png" alt="" />
                                <span>YouTube</span>
                            </div>
                            <div className="icon-box">
                                <img src="/material/social-media/instagram.png" alt="" />
                                <span>Instagram</span>
                            </div>
                            <div className="icon-box">
                                <img src="/material/social-media/facebook.png" alt="" />
                                <span>Facebook</span>
                            </div>
                            <div className="icon-box">
                                <img src="/material/social-media/twiiter.png" alt="" />
                                <span>Twitter</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-box">
                    <span>{data.title}</span>
                    <div className="video-play" id="video">
                        <iframe
                            width="100%"
                            height="100%"
                            src={data.link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="description" id="description">
                        <span>Project Description</span>
                        <p>{data.description}</p>
                        {data.Workingdetails ? (
                            <Fragment>
                                <span>How it works</span>
                                <p>{data.Workingdetails}</p>
                            </Fragment>
                        ) : null}
                    </div>
                    <div className="coding" id="coding">
                        <div className="title">
                            <span>Coding</span>
                            <button
                                type="button"
                                onClick={copyText}
                            >
                                <i className="fa-regular fa-clipboard"></i>Copy Code
                            </button>
                        </div>
                        <div className="coding-box">
                            <textarea value={textareaValue} readOnly></textarea>
                        </div>
                    </div>
                    <div className="required" id="required">
                        <span>Materials Required</span>
                        <ol>
                            {data.product &&
                                data.product.map((dat, index) => (
                                    <li key={index}>
                                        {dat.productname}
                                        {dat.productlink ?
                                            <button type="button">
                                                <a href={dat.productlink}>View product</a>
                                            </button> : null
                                        }
                                    </li>
                                ))}
                        </ol>
                    </div>
                    <div className="circuit" id="circuit">
                        <span>Circuit</span>
                        <div className="img-box">
                            <img src={`/material/img/${data.circult}`} alt="" />
                        </div>
                    </div>
                </div>
                <div className="about-us">
                    <div className="about">
                        <span>Think Arduino</span>
                        <p>
                            Website done by <br />
                            <span>V Sudharsan</span>
                        </p>
                    </div>
                    <div className="social-media">
                        <div className="icon-box" onClick={() => { window.location.href = "https://youtube.com/@thinkarduino6078?si=LdBJdpsBNpI15Nst" }}>
                            <img src="/material/social-media/youtubr.png" alt="" />
                            <span>YouTube</span>
                        </div>
                        <div className="icon-box">
                            <img src="/material/social-media/instagram.png" alt="" />
                            <span>Instagram</span>
                        </div>
                        <div className="icon-box">
                            <img src="/material/social-media/facebook.png" alt="" />
                            <span>Facebook</span>
                        </div>
                        <div className="icon-box">
                            <img src="/material/social-media/twiiter.png" alt="" />
                            <span>Twitter</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
