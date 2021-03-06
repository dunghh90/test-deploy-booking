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
  //         <Col span={10}>S??? l?????ng ng?????i l???n: </Col>
  //         <Col span={14}>{countAdults}</Col>
  //         <Col span={10}>S??? l?????ng tr??? em: </Col>
  //         <Col span={14}>{countChild}</Col>
  //         <Col span={24}>T???ng ti???n: {money.toLocaleString()} VN??</Col>
  //       </Row>
  //     </>
  //   )
  // }

  // function showConfirmBooking() {
  //   Modal.confirm({
  //     title: 'Th??ng tin tour ???? ?????t:',
  //     icon: <ExclamationCircleOutlined />,
  //     content: renderConfirmTour(),//'Tour ???? N???ng 2 ng??y 3 ????m',
  //     okText: 'X??c nh???n',
  //     cancelText: 'Hu???',
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
  //     alert('B???n c???n ????ng nh???p!');
  //     history.push({
  //       pathname: '/login',
  //       state: {
  //         prevPath: `tours/${tourId}`
  //       }
  //     })
  //   } else if (!dateSelected) {
  //     alert('C???n ch???n ng??y ?????t tour!');
  //   } else {
  //     // localStorage.setItem('carts', JSON.stringify(newCartList));
  //     // TODO Check tourId v?? startDate n???u t???n t???i trong db th?? ko add booking
  //     const listBooking = tourDetail.data.bookingTours.filter((item) => {
  //       return dateSelected.trim().toLowerCase().indexOf(item.startDate.trim().toLowerCase()) !== -1;
  //     })
  //     let customerBooking = 0;
  //     const numBooking = countAdults + countChild;
  //     listBooking.forEach((item) => {
  //       customerBooking += item.numberAdults + item.numberChild;
  //     });
  //     if (numBooking + customerBooking > tourDetail.data.maxCustomer) {
  //       alert("S??? l?????ng kh??ch c??n l???i: " + (tourDetail.data.maxCustomer - customerBooking));
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
                <li><HomeOutlined  /> <a className="itemPath" href="/du-lich/">Trang ch???</a></li>
                <li><div style={{display:"inline", color:"#bfbfbf", padding:"0px 10px"}} >\</div><a className="itemPath" href="/du-lich/">???? N???ng</a></li>
                <li><div style={{display:"inline", color:"#bfbfbf", padding:"0px 10px"}}>\</div><a className="itemPath" href="/du-lich/">Tour ???? N???ng 4N3D: TP. HCM - ???? N???ng - B?? N?? - H???i An - Hu??? - Qu???ng B??nh</a></li>
              </ul>
          </Row> */}
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item>
                <HomeOutlined /> Trang ch???
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">???? N???ng</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">
                  Tour ???? N???ng 4N3D: TP. HCM - ???? N???ng - B?? N?? - H???i An - Hu??? -
                  Qu???ng B??nh
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
              <span className="score-description">Tuy???t v???i</span>
            </span>
            <span>| 1 ????nh gi?? </span>
            <span
              style={{ padding: "0px 5px", color: "blue", fontWeight: 600 }}
            >
              {customerRemain != 0 &&
                " ( S??? kh??ch c??n l???i c?? th??? ?????t: " + customerRemain + " )"}
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
                  <Col span={6}><DingtalkOutlined /> Ph????ng ti???n</Col>
                  <Col span={6} align="right">M?? tour: TO516</Col>
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
                <h3 id="tour-rule" className="tourDetailheadLine vcolor-primary">Ch??nh s??ch ph??? thu</h3>
                <div >
                  <p>- Ph??? thu ph??ng ????n: 1.100.000 vn??/kh??ch/tour.&nbsp;</p>
                  <p>- Tr??? em t??? ????? 10 tu???i tr??? l??n ti??u chu???n nh?? ng?????i l???n.</p>
                  <p>- T??? ????? 5 ?????n d?????i 10 tu???i: Ti??u chu???n ??n ?? su???t, ng???i 1 gh??? ?? t??, ng??? gh??p chung v???i b??? m???.</p>
                  <p>- T??? ????? 2 ?????n d?????i 5 tu???i: Gi?? tour ch??? bao g???m v?? m??y bay, b???o hi???m, n?????c u???ng. C??c chi ph?? ??n u???ng, v?? th???ng c???nh n???u ph??t sinh, cha m??? s??? t??? lo cho b??.</p>
                  <p>- D?????i 2 tu???i: Gi?? tour ch??? bao g???m ch??? ng???i tr??n m??y bay theo quy ?????nh c???a h??ng kh??ng, b???o hi???m, n?????c u???ng.</p>
                </div>
                <h3 className="tourDetailheadLine vcolor-primary">??i???u kho???n</h3>
                <div >
                  <p><span style={{textDecoration: "underline"}}>V???n chuy???n</span>:</p>
                  <p>- Xe m??y l???nh ?????i m???i v???n chuy???n theo l???ch tr??nh t???i Qu???ng Ng??i ??? L?? S??n.</p>
                  <p>- Xe ????n/ti???n s??n bay N???i B??i.</p>
                  <p>-&nbsp;V?? m??y bay kh??? h???i H?? N???i ??? Chu Lai ??? H?? N???i (VietNam Airlines) g???m 12kg x??ch tay + 23kg k?? g???i. V?? m??y bay ??o??n kh??ng ho??n kh??ng h???y c???a h??ng kh??ng QG Vi???t Nam.</p>
                  <p>- Xe ??i???n ho???c xe ??m di chuy???n tr??n ?????o B?? L?? S??n.</p>
                  <p>- Cano si??u t???c t??? Sa K??? ??i L?? S??n v?? ng?????c l???i.</p>
                  <p>- Cano cao t???c ??i t??? ?????o B?? kh??? h???i.</p>
                  <p><span style={{textDecoration: "underline"}}>L??u Tr??</span>:</p>
                  <p>- Ph??ng kh??ch s???n ti??u chu???n l???a ch???n (02 kh??ch/ph??ng, tr?????ng h???p l??? ngh??? 3 kh??ch/ph??ng) ho???c c??c kh??ch s???n t????ng ??????ng.</p>
                  <p>+ Kh??ch s???n 3 sao L?? S??n Central ho???c kh??ch s???n t????ng ??????ng.</p>
                  <p>+ Kh??ch s???n 4 sao Thi??n ???n Hotel Qu???ng Ng??i&nbsp;ho???c kh??ch s???n t????ng ??????ng.</p>
                  <p><span style={{textDecoration: "underline"}}>Kh??c</span>:</p>
                  <p>- ??n u???ng theo l???ch tr??nh tham quan.&nbsp;</p>
                  <p>- HDV ????n/ti???n s??n bay N???i B??i.</p>
                  <p>- HDV nhi???t t??nh, kinh nghi???m theo ??o??n su???t tuy???n t???i Qu???ng Ng??i ??? L?? S??n.</p>
                  <p>- B???o hi???m du l???ch su???t tuy???n (m???c ?????n b?? t???i ??a 20.000.000??/v???).</p>
                  <p>- Ph?? th???ng c???nh c??c ??i???m v??o c???a theo ch????ng tr??nh.</p>
                  <p>- N?????c u???ng 1 chai/kh??ch/ng??y</p>
                  <p>- M?? du l???ch.</p>
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
                    <Col span={10}>Ch???n ng??y kh???i h??nh:</Col>
                    <Col span={14}><DatePicker defaultValue={moment(d)} format={dateFormat} onChange={(value) => setDateSelected(moment(value).format("DD/MM/YYYY"))} /></Col>
                    <Col span={10}>Ng?????i l???n:</Col>
                    <Col span={14}><InputNumber min={1} defaultValue={1} onChange={(values) => { setCountAdults(values); setMoneyAdults(values); }} /></Col>
                    <Col span={10}>Tr??? em:</Col>
                    <Col span={14}><InputNumber min={0} defaultValue={0} onChange={(values) => { setCountChild(values); setMoneyChild(values); }} /></Col>
                    <Col span={24} ><div style={{ fontSize: 24, color: "#ffbd00", float: "right", fontWeight: "bold" }}>{money && (money.toLocaleString() + " VND")}</div></Col>
                    <Col span={24}>
                      <Button style={{ width: "100%", height:40, fontSize:18, backgroundColor:"#ffa940", color:"white" }}  htmlType="submit" onClick={() => handleBookingTour()}>
                        ?????t tour
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
                      "CH????NG TR??NH TOUR",
                      "??I???U KHO???N QUY ?????NH",
                      "????NH GI?? TOUR"
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
                      <a style={{color:"gray"}} href="#tour-program">CH????NG TR??NH TOUR</a>
                    </List.Item>
                    <List.Item className ="moveLocation" >
                      <a style={{color:"gray"}} href="#tour-rule">??I???U KHO???N QUY ?????NH</a>
                    </List.Item>
                    <List.Item className ="moveLocation" >
                      <a style={{color:"gray"}} href="#tour-comment">????NH GI?? TOUR</a>
                    </List.Item>
                  </List>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Card
              title={`Tours du l???ch ${tourDetail.data.location.name} li??n quan`}
              extra={
                <a className="loadMore" href="#">
                  XEM T???T C???{" "}
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
                        cover={<img alt="Ph?? Qu???c" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                      >
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card 
                        hoverable
                        cover={<img alt="Ph?? Qu???c" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                      >
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card 
                        hoverable
                        cover={<img alt="Ph?? Qu???c" src="https://cdn2.ivivu.com/2020/07/10/17/ivivu-phu-quoc-bia-360x225.gif" />}
                      >

                      </Card>
                    </Col> */}
              </Row>
            </Card>
          </Row>
          <Button onClick={() => topFunction()} id="myBtn" title="Di chuy???n l??n ?????u">Top</Button>
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
