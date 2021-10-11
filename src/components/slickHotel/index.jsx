import React from "react";
import Slider from "react-slick";
import "./style.css";

function Slipder() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    // autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
  };
  return (
    <>
      <h1 className="title">Danh lam thắng cảnh</h1>
      <span className="des">Những địa điểm hot trong nước</span>
      <Slider className="tong" {...settings}>
        <div className="slick-container">
          <img
            className="slid"
            src="//cdn1.ivivu.com/iVivu/2018/09/14/14/vungtau_2-370x395.jpg"
            alt=""
          />
        </div>
        <div className="slick-container">
          <img
            className="slid"
            src="//cdn1.ivivu.com/iVivu/2018/09/14/14/danang_2-370x395.png"
            alt=""
          />
        </div>
        <div className="slick-container">
          <img
            className="slid"
            src="https://media-cdn.laodong.vn/Storage/NewsPortal/2017/8/28/551691/Du-Lich_1.jpg"
            alt=""
          />
        </div>
        <div className="slick-container">
          <img
            className="slid"
            src="https://vcdn1-dulich.vnecdn.net/2019/12/26/1-Phong-Nam-Quay-Son-Cao-Ky-Nhan.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=6x9iOOfrvddpnFFZUYSwyg"
            alt=""
          />
        </div>
        <div className="slick-container">
          <img
            className="slid"
            src="https://taybacsensetravel.com/view/at_nhung-hinh-anh-du-lich-dep-me-hon-cua-vung-dat-tay-bac_019194d3614616680f8a580c1f6a964e.jpg"
            alt=""
          />
        </div>
        <div className="slick-container">
          <img
            className="slid"
            src="https://dulichtoday.vn/wp-content/uploads/2017/04/Bien-My-Khe.jpg"
            alt=""
          />
        </div>
      </Slider>
    </>
  );
}
export default Slipder;
