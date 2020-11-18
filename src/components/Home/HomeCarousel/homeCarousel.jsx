import React from "react";
import { Carousel } from "antd";
import banner1 from "../../../images/banner1.png";
import banner2 from "../../../images/banner2.png";
import banner3 from "../../../images/banner3.png";


import "./index.css";

const HomeCarousel = () => {
  /* eslint-disable*/
  const minWidth = document.documentElement.clientWidth || document.body.clientWidth;
  return (
    <div className="home-carousel">
      <Carousel autoplay>
        <div className="img-box">
          <a style={{minWidth}}  href="javascript:void(0);" >
            <img src={banner1} alt=""/>
          </a>
        </div>
        <div className="img-box">
          <a style={{minWidth}} href="javascript:void(0);">
            <img src={banner2} alt=""/>
          </a>
        </div>
        <div className="img-box">
          <a style={{minWidth}} href="javascript:void(0);">
            <img src={banner3} alt=""/>
          </a>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
