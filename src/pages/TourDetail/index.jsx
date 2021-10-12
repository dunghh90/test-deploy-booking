import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  InputNumber,
  Modal,
  List,
} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from "../../utils/history";

import {
  EnvironmentOutlined,
  HistoryOutlined,
  DingtalkOutlined,
} from "@ant-design/icons";

import {
  getTourDetailAction,
  getTourListAction,
  bookingTourAction,
} from "../../redux/actions";
import { HomeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import CommentPage from "../../components/Comment";
import moment from "moment";

import "./style.css";

import { Content } from "antd/lib/layout/layout";
import BookingTourPage from "./components/bookingTour";
import ItemTour from "../TourHome/components/ItemTour";

function TourDetailPage({
  tourDetail,
  getTourDetail,
  tourList,
  getTourList,
  bookingTour,
  userInfo,
  match,
}) {
  const [orderTourForm] = Form.useForm();
  const { TextArea } = Input;
  const tourId = match.params.id;
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [money, setMoney] = useState(tourDetail.data.price);
  const [countAdults, setCountAdults] = useState(1);
  const [countChild, setCountChild] = useState(0);
  var d = new Date();
  const [dateSelected, setDateSelected] = useState(
    moment(d).format("DD/MM/YYYY")
  );
  const [customerRemain, setCustomerRemain] = useState(0);

  const [rateTourForm] = Form.useForm();

  useEffect(() => {
    getTourDetail({ id: tourId });
    getTourList({
      page: 1,
      limit: 10,
    });
  }, []);

  const dateFormat = "DD/MM/YYYY";
  useEffect(() => {
    if (tourDetail.data.id) {
      setMoney(tourDetail.data.price);
    }
  }, [tourDetail.data]);
  // useEffect(() => {
  //   getTourDetail({ id: tourId });
  //   debugger
  // }, [customerRemain])
  const filterTourListByTopic = tourList.data.filter((item) => {
    return item.topicTourId == tourDetail.data.topicTourId;
  });


  var mybutton = document.getElementById("myBtn");

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // function setMoneyAdults(values) {
  //   setMoney(tourDetail.data.price * values + tourDetail.data.price * countChild * 0.5);
  // }
  // function setMoneyChild(values) {
  //   setMoney(tourDetail.data.price * countAdults + tourDetail.data.price * values * 0.5);
  // }

  // function renderConfirmTour() {
  //   return (
  //     <>
  //       <Row ><h3>{tourDetail.data.name}</h3></Row>
  //       <Row>
  //         <Col span={10}>Số lượng người lớn: </Col>
  //         <Col span={14}>{countAdults}</Col>
  //         <Col span={10}>Số lượng trẻ em: </Col>
  //         <Col span={14}>{countChild}</Col>
  //         <Col span={24}>Tổng tiền: {money.toLocaleString()} VNĐ</Col>
  //       </Row>
  //     </>
  //   )
  // }

  // function showConfirmBooking() {
  //   Modal.confirm({
  //     title: 'Thông tin tour đã đặt:',
  //     icon: <ExclamationCircleOutlined />,
  //     content: renderConfirmTour(),//'Tour Đà Nẵng 2 ngày 3 đêm',
  //     okText: 'Xác nhận',
  //     cancelText: 'Huỷ',
  //     onOk() {
  //       console.log('OK');
  //       bookingTour({
  //         userId: userInfo.data.id,
  //         tourId: parseInt(tourId),
  //         startDate: dateSelected,
  //         numberAdults: countAdults,
  //         numberChild: countChild,
  //         totalPrice: money
  //       })
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //   });
  // }

  // function handleBookingTour() {
  //   if (!userInfo.data.id) {
  //     alert('Bạn cần đăng nhập!');
  //     history.push({
  //       pathname: '/login',
  //       state: {
  //         prevPath: `tours/${tourId}`
  //       }
  //     })
  //   } else if (!dateSelected) {
  //     alert('Cần chọn ngày đặt tour!');
  //   } else {
  //     // localStorage.setItem('carts', JSON.stringify(newCartList));
  //     // TODO Check tourId và startDate nếu tồn tại trong db thì ko add booking
  //     const listBooking = tourDetail.data.bookingTours.filter((item) => {
  //       return dateSelected.trim().toLowerCase().indexOf(item.startDate.trim().toLowerCase()) !== -1;
  //     })
  //     let customerBooking = 0;
  //     const numBooking = countAdults + countChild;
  //     listBooking.forEach((item) => {
  //       customerBooking += item.numberAdults + item.numberChild;
  //     });
  //     if (numBooking + customerBooking > tourDetail.data.maxCustomer) {
  //       alert("Số lượng khách còn lại: " + (tourDetail.data.maxCustomer - customerBooking));
  //     } else {
  //       showConfirmBooking();
  //       setCustomerRemain(tourDetail.data.maxCustomer - (numBooking + customerBooking));
  //       // getTourDetail({ id: tourId });
  //     }

  //   }
  // }

  return (
    <>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
          display: "flex",
          marginTop: 65,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1300, width: "100%" }}>
          {/* <Row >
              <ul className="listPath" >
                <li><HomeOutlined  /> <a className="itemPath" href="/du-lich/">Trang chủ</a></li>
                <li><div style={{display:"inline", color:"#bfbfbf", padding:"0px 10px"}} >\</div><a className="itemPath" href="/du-lich/">Đà Nẵng</a></li>
                <li><div style={{display:"inline", color:"#bfbfbf", padding:"0px 10px"}}>\</div><a className="itemPath" href="/du-lich/">Tour Đà Nẵng 4N3D: TP. HCM - Đà Nẵng - Bà Nà - Hội An - Huế - Quảng Bình</a></li>
              </ul>
          </Row> */}
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item>
                <HomeOutlined /> Trang chủ
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Đà Nẵng</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">
                  Tour Đà Nẵng 4N3D: TP. HCM - Đà Nẵng - Bà Nà - Hội An - Huế -
                  Quảng Bình
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row
            style={{
              fontSize: 37,
              fontWeight: 600,
              color: "#10239e",
              fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
            }}
          >
            {tourDetail.data.name}
          </Row>
          <Row justify="start" style={{ margin: "10px 0" }}>
            <span className="score-container">
              <span className="score">{tourDetail.data.rate}.0</span>
              <span className="score-description">Tuyệt vời</span>
            </span>
            <span>| 1 đánh giá </span>
            <span
              style={{ padding: "0px 5px", color: "blue", fontWeight: 600 }}
            >
              {customerRemain != 0 &&
                " ( Số khách còn lại có thể đặt: " + customerRemain + " )"}
            </span>
          </Row>
          <Row span={24} gutter={24}>
            <Col
              span={16}
              xl={{ order: 1 }}
              lg={{ order: 1 }}
              md={{ order: 2 }}
              sm={{ order: 2 }}
              xs={{ order: 2 }}
            >
              <Row>
                <div style={{
                  width:"100%",
                  height:390,
                  backgroundRepeat: "no-repeat",
                  backgroundSize:"cover",
                  backgroundImage: `url(${tourDetail.data.urlTitleDetail})`
                  
                }}>
                </div>
              </Row>
              <Row style={{padding: "10px 10px", backgroundColor:"#d9d9d9"}}>
                  <Col span={6}><EnvironmentOutlined /> {tourDetail.data.location.name}</Col>
                  <Col span={6}><HistoryOutlined /> {tourDetail.data.time}</Col>
                  <Col span={6}><DingtalkOutlined /> Phương tiện</Col>
                  <Col span={6} align="right">Mã tour: TO516</Col>
              </Row>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px 30px 30px 30px",
                  textAlign: "justify",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: tourDetail.data.information,
                  }}
                ></div>
              </div>

              <div style={{borderTop:'1px solid #f0f0f0', backgroundColor: "white", padding: "10px 30px 30px 30px", textAlign: "justify" }}>
                <h3 id="tour-rule" className="tourDetailheadLine vcolor-primary">Chính sách phụ thu</h3>
                <div >
                  <p>- Phụ thu phòng đơn: 1.100.000 vnđ/khách/tour.&nbsp;</p>
                  <p>- Trẻ em từ đủ 10 tuổi trở lên tiêu chuẩn như người lớn.</p>
                  <p>- Từ đủ 5 đến dưới 10 tuổi: Tiêu chuẩn ăn ½ suất, ngồi 1 ghế ô tô, ngủ ghép chung với bố mẹ.</p>
                  <p>- Từ đủ 2 đến dưới 5 tuổi: Giá tour chỉ bao gồm vé máy bay, bảo hiểm, nước uống. Các chi phí ăn uống, vé thắng cảnh nếu phát sinh, cha mẹ sẽ tự lo cho bé.</p>
                  <p>- Dưới 2 tuổi: Giá tour chỉ bao gồm chỗ ngồi trên máy bay theo quy định của hàng không, bảo hiểm, nước uống.</p>
                </div>
                <h3 className="tourDetailheadLine vcolor-primary">Điều khoản</h3>
                <div >
                  <p><span style={{textDecoration: "underline"}}>Vận chuyển</span>:</p>
                  <p>- Xe máy lạnh đời mới vận chuyển theo lịch trình tại Quảng Ngãi – Lý Sơn.</p>
                  <p>- Xe đón/tiễn sân bay Nội Bài.</p>
                  <p>-&nbsp;Vé máy bay khứ hồi Hà Nội – Chu Lai – Hà Nội (VietNam Airlines) gồm 12kg xách tay + 23kg ký gửi. Vé máy bay Đoàn không hoàn không hủy của hàng không QG Việt Nam.</p>
                  <p>- Xe điện hoặc xe ôm di chuyển trên Đảo Bé Lý Sơn.</p>
                  <p>- Cano siêu tốc từ Sa Kỳ đi Lý Sơn và ngược lại.</p>
                  <p>- Cano cao tốc đi từ Đảo Bé khứ hồi.</p>
                  <p><span style={{textDecoration: "underline"}}>Lưu Trú</span>:</p>
                  <p>- Phòng khách sạn tiêu chuẩn lựa chọn (02 khách/phòng, trường hợp lẻ nghỉ 3 khách/phòng) hoặc các khách sạn tương đương.</p>
                  <p>+ Khách sạn 3 sao Lý Sơn Central hoặc khách sạn tương đương.</p>
                  <p>+ Khách sạn 4 sao Thiên Ấn Hotel Quảng Ngãi&nbsp;hoặc khách sạn tương đương.</p>
                  <p><span style={{textDecoration: "underline"}}>Khác</span>:</p>
                  <p>- Ăn uống theo lịch trình tham quan.&nbsp;</p>
                  <p>- HDV đón/tiễn sân bay Nội Bài.</p>
                  <p>- HDV nhiệt tình, kinh nghiệm theo đoàn suốt tuyến tại Quảng Ngãi – Lý Sơn.</p>
                  <p>- Bảo hiểm du lịch suốt tuyến (mức đền bù tối đa 20.000.000đ/vụ).</p>
                  <p>- Phí thắng cảnh các điểm vào cửa theo chương trình.</p>
                  <p>- Nước uống 1 chai/khách/ngày</p>
                  <p>- Mũ du lịch.</p>
                </div>
              </div>

              

              <div style={{backgroundColor:"white", padding:16, marginTop:16}}>
                <CommentPage tourId={tourId} />
              </div>
            </Col>
            <Col span={8} xl={{ order: 2 }} lg={{ order: 2 }} md={{ order: 1 }} sm={{ order: 1 }} xs={{ order: 1 }}>
              <div style={{position:"sticky", top:65}}>
                <div className="order-form-container">
                  <BookingTourPage
                    customerRemain={customerRemain}
                    setCustomerRemain={setCustomerRemain}
                    tourId={tourId}
                  />
                  {/* <Row span={24} gutter={[10, 10]}>
                    <Col span={10}>Chọn ngày khởi hành:</Col>
                    <Col span={14}><DatePicker defaultValue={moment(d)} format={dateFormat} onChange={(value) => setDateSelected(moment(value).format("DD/MM/YYYY"))} /></Col>
                    <Col span={10}>Người lớn:</Col>
                    <Col span={14}><InputNumber min={1} defaultValue={1} onChange={(values) => { setCountAdults(values); setMoneyAdults(values); }} /></Col>
                    <Col span={10}>Trẻ em:</Col>
                    <Col span={14}><InputNumber min={0} defaultValue={0} onChange={(values) => { setCountChild(values); setMoneyChild(values); }} /></Col>
                    <Col span={24} ><div style={{ fontSize: 24, color: "#ffbd00", float: "right", fontWeight: "bold" }}>{money && (money.toLocaleString() + " VND")}</div></Col>
                    <Col span={24}>
                      <Button style={{ width: "100%", height:40, fontSize:18, backgroundColor:"#ffa940", color:"white" }}  htmlType="submit" onClick={() => handleBookingTour()}>
                        Đặt tour
                      </Button>
                    </Col>
                  </Row> */}
                </div>
                <div style={{minWidth:400, borderRadius:4}}>
                  {/* <List
                    size="small"
                    // header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}></h4>}
                    bordered
                    dataSource={[
                      "CHƯƠNG TRÌNH TOUR",
                      "ĐIỀU KHOẢN QUY ĐỊNH",
                      "ĐÁNH GIÁ TOUR"
                    ]}
                    renderItem={(item) => (
                      <List.Item
                        // onClick={() => handleFilterLocaiton(item.id)}
                        // style={{color: locationSelected === item.id ? 'red': 'black' }}
                        className="moveLocation"
                      >
                        <a style={{ color: "gray" }} href="#tour-program">
                          {item}
                        </a>
                      </List.Item>
                    )}
                  /> */}
                  <List size="small" bordered >
                    <List.Item className ="moveLocation" >
                      <a style={{color:"gray"}} href="#tour-program">CHƯƠNG TRÌNH TOUR</a>
                    </List.Item>
                    <List.Item className ="moveLocation" >
                      <a style={{color:"gray"}} href="#tour-rule">ĐIỀU KHOẢN QUY ĐỊNH</a>
                    </List.Item>
                    <List.Item className ="moveLocation" >
                      <a style={{color:"gray"}} href="#tour-comment">ĐÁNH GIÁ TOUR</a>
                    </List.Item>
                  </List>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Card
              title={`Tours du lịch ${tourDetail.data.location.name} liên quan`}
              extra={
                <a className="loadMore" href="#">
                  XEM TẤT CẢ{" "}
                </a>
              }
              style={{ width: "100%", marginTop: 16 }}
            >
              <Row gutter={[28, 28]}>
                {filterTourListByTopic.map((item, index) => {
                  return (
                    <ItemTour
                      key={index}
                      id={item.id}
                      title={item.name}
                      link={item.link}
                      description={item.description}
                      price={item.price}
                      rate={item.rate}
                    />
                  );
                })}
                {/* <Col span={8}>
                      <Card 
                        hoverable
                        cover={<img alt="Phú Quốc" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                      >
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card 
                        hoverable
                        cover={<img alt="Phú Quốc" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                      >
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card 
                        hoverable
                        cover={<img alt="Phú Quốc" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                      >

                      </Card>
                    </Col> */}
              </Row>
            </Card>
          </Row>
          <Button onClick={() => topFunction()} id="myBtn" title="Di chuyển lên đầu">Top</Button>
          {/* <button onClick onclick="topFunction()" id="myBtn" title="Go to top">Top</button> */}
        </div>
      </Content>
    </>
  );
}

const mapStateToProps = (state) => {
  const { tourDetail, tourList } = state.tourReducer;
  const { userInfo } = state.userReducer;
  return {
    tourDetail,
    tourList,
    userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourDetail: (params) => dispatch(getTourDetailAction(params)),
    getTourList: (params) => dispatch(getTourListAction(params)),
    bookingTour: (params) => dispatch(bookingTourAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailPage);
