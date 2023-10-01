import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_API_ALL, SEARCH_API } from "../../scrives/api/adminapi";
import { Head } from "../nav-bar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function Home() {
    const [data, Setdata] = useState([]);
    const [search, Setsearch] = useState()
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
        },
        tablet: {
            breakpoint: { max: 950, min: 650 },
            items: 2,
            partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1,
            partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
        }
    }

    useEffect(() => {
        GET_API_ALL().then((Response) => {
            Setdata(Response.data);
        }).catch((err) => {
            console.log(err);
        })

        document.title = "Home-THINKSPEAK"
    }, [])

    const Searchchange = (event) => {
        Setsearch(event.target.value)
    }

    if (search !== "") {
        SEARCH_API(search).then((response) => {
            Setdata(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <Head />
            <div className="homevideo">
                <div className="img-slider">
                    <div className="img-mover">

                        <Carousel responsive={responsive} showDots={true} infinite={true} ssr={true} keyBoardControl={true} autoPlay={true}
                            partialVisbile={true}
                            focusOnSelect={true}
                            autoPlaySpeed={3000}>
                            <img src="/material/img1.jpg" alt="" />
                            <img src="/material/img2.jpg" alt="" />
                            <img src="/material/img3.jpg" alt="" />
                            <img src="/material/img4.jpg" alt="" />
                            <img src="/material/img5.jpg" alt="" />
                            <img src="/material/img6.jpg" alt="" />
                            <img src="/material/img7.jpg" alt="" />
                            <img src="/material/img8.jpg" alt="" />
                            <img src="/material/img9.jpg" alt="" />
                            <img src="/material/img10.jpg" alt="" />
                            <img src="/material/img11.jpg" alt="" />
                        </Carousel>
                    </div>
                </div>
                <div className="video-page">
                    <span>Youtube video</span>
                    <div className="search-box">
                        <i className="fa-solid fa-search"></i>
                        <input type="search" onChange={Searchchange} />
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