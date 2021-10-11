import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Row, Col } from 'antd';
import './slick.css'


 function  SimpleSlider () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      // pauseOnHover: true
      
    };
    
    return (
      <Row>
        <Col span ='24'>
        <Slider {...settings}>
          {/* <div className ="minh">
            <img className="slider" src="https://cdn3.ivivu.com/2014/01/SUPER-DELUXE2.jpg" alt=""/>
          </div> */}
          <div>
          <img  className="slider" src="https://gohola.vn/uploads/2018/01/dlg-da-nang-gohola-travel-2-800x600.jpg" alt=""/>
          </div>
          <div>
          <img  className="slider" src="https://cdn3.ivivu.com/2014/01/SUPER-DELUXE2.jpg" alt=""/>
          </div>
          <div>
          <img  className="slider" src="https://noithatmyhouse.com/wp-content/uploads/2019/05/thiet-ke-khach-san-5-sao.jpg" alt=""/>
          </div>
          <div>
          <img  className="slider" src="https://gohola.vn/uploads/2018/01/dlg-da-nang-gohola-travel-2-800x600.jpg" alt=""/>
          </div>
         
        </Slider>
        </Col>
      </Row>
    );
    
  
}
       
       

export default SimpleSlider;