import React from 'react'
import Slider from "react-slick";
import './Main.css'

export default function Main() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
      };
  return (
    <main>
        <div>
            <div className='truncate'>
                <Slider {...settings}>
                    <div>
                        <h3><img src='	https://theme.hstatic.net/200000549029/1000902525/14/home_slider_image_2.jpg?v=2926'></img></h3>
                    </div>
                    <div>
                        <h3><img src='/src/assets/img/index-banner/bosuutap1_slider_image_2.webp'></img></h3>
                    </div>
                </Slider>
            </div>
        </div>

        <div>
        <div className="content">
            <div className="p1">
            <div className="p1_content">
                <span>Top</span> <br />
                <a href="#">Xem thêm</a>
            </div>
            </div>
            <div className="p2">
            <div className="p2_content">
                <span>Midi dress</span> <br />
                <a href="#">Xem thêm</a>
            </div>
            </div>
            <div className="p3">
            <div className="p3_content">
                <span>Outerwear</span> <br />
                <a href="#">Xem thêm</a>
            </div>
            </div>
            <div className="p4">
            <div className="p4_content">
                <span>Skirt</span> <br />
                <a href="#">Xem thêm</a>
            </div>
            </div>
            <div className="p5">
            <div className="p5_content">
                <span>Set</span> <br />
                <a href="#">Xem thêm</a>
            </div>
            </div>
            <div className="p6">
            <div className="p6_content">
                <span>Mini dress</span> <br />
                <a href="#">Xem thêm</a>
            </div>
            </div>
        </div>
        <div className="banner_sale">
        </div>
        <div className="section">
            <div className="section_title">
            <h2>HIME'S BLOG</h2>
            </div>
        </div>
        <div className="blog">
            <div className="blog_1">
            </div>
            <div className="blog_2">
            </div>
        </div>
        </div>

    </main>
    
  )
}
