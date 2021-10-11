import { Row, Col, Button, BackTop } from "antd";
import history from "../../utils/history";
import { connect } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  EnvironmentOutlined,
  TeamOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import SearchTour from "../../components/SearchTour";
import { getLocationListAction } from "../../redux/actions";
import { useEffect, useState } from "react";

import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage({ getLocationList, locationList, match }) {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };
  const [keySearchLocation, setKeySearchLocation] = useState("");

  useEffect(() => {
    getLocationList({
      page: 1,
      limit: 12,
    });
  }, []);

  const filterListLocation = locationList.data.filter((item) => {
    return item.name.trim().indexOf(keySearchLocation.trim()) !== -1;
  });

  function loadmoreLocaltion() {
    getLocationList({
      more: true,
      page: locationList.page + 1,
      limit: 12,
    });
  }
  function renderLocationList() {
    if (locationList.load) return <p>Loading...</p>;
    return locationList.data.map((item, index) => {
      return (
        <>
          <Col span={8} key={index}>
            <div className="noteHome">
              <img
                className="item"
                src={item.img}
                onClick={() =>
                  history.push({
                    pathname: "/hotels",
                    state: {
                      locationId: item.id,
                    },
                  })
                }
              />
              <h2 className="thongtin">{item.name}</h2>
            </div>
          </Col>
        </>
      );
    });
  }

  return (
    <>
      <div className="container-search"></div>
      <div
        style={{
          backgroundColor: "#e0e7ef",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: 400,
            color: "#003C71",
            maxWidth: 1400,
            width: "100%",
            padding: "15px 50px",
          }}
        >
          <Col
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <AiFillCheckCircle style={{ fontSize: 46, fontWeight: 600 }} />{" "}
            Khách sạn và Tour chọn lọc chất lượng nhất
          </Col>
          <Col
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <AiFillCheckCircle style={{ fontSize: 46, fontWeight: 600 }} /> Bảo
            đảm giá tốt nhất
          </Col>
          <Col
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <AiFillCheckCircle style={{ fontSize: 46, fontWeight: 600 }} /> Đội
            ngũ tư vấn chi tiết và tận tình
          </Col>
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "10px 50px", maxWidth: 1400, width: "100%" }}>
          <div className="localHeadLine">Chọn Điểm Du Lịch </div>
          <Row gutter={[12, 12]} align="bottom">
            {renderLocationList()}
            <Row>
              <BackTop className="backtop">
                <div style={style}>
                  <ArrowUpOutlined />
                </div>
              </BackTop>
            </Row>
            {locationList.data.length % 12 === 0 && (
              <Button onClick={() => loadmoreLocaltion()}>
                Xem thêm khách sạn
              </Button>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const { locationList } = state.hotelReducer;
  return {
    locationList: locationList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getLocationList: (params) => dispatch(getLocationListAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
