import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_API_ALL } from "../../scrives/api/adminapi";
import Register from "../resgister";
import { authication } from "../../scrives/auth";
import { Head } from "../nav-bar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function Home() {
    const [data, Setdata] = useState([]);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    useEffect(() => {
        GET_API_ALL().then((Response) => {
            console.log(Response);
            Setdata(Response.data);
        })
    }, [])
    return (
        <Fragment>
            <Head />
            <div className="homevideo">
                <div className="img-slider">
                    <i className="fa-solid fa-chevron-left"></i>
                    <i className="fa-solid fa-chevron-right" id="left-navigator"></i>
                    <div className="img-box">
                        <div className="img-mover">
                            <Carousel responsive={responsive}>
                                <img src="/material/img1.jpg" alt="" />
                                <img src="/material/img2.jpg" alt="" />
                                <img src="/material/img3.jpg" alt="" />
                                <img src="/material/img4.jpg" alt="" />
                                <img src="/material/img5.jpg" alt="" />
                            </Carousel>
                        </div>
                    </div>
                    <div className="circle-box">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
                <div className="video-page">
                    <span>Youtube video</span>
                    <div className="search-box">
                        <i className="fa-solid fa-search"></i>
                        <input type="search" />
                    </div>
                    <div className="video-block">
                        {data && data.map((dat, index) => (
                            <Link to={`/video/${dat._id}`}>
                                <div className="video-box" key={index}>
                                    <div className="img-box"><img src={`/material/img/${dat.img}`} alt="" /></div>
                                    <div className="title-box"><span>{dat.title}</span></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}