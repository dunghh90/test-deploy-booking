import {
  Button,
  Card,
  DatePicker,
  Row,
  Col,
  Form,
  Input,
  Space,
  Modal,
  Divider,
  Tag,
  Descriptions,
} from "antd";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  SendOutlined,
  HomeOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  BankOutlined,
  AimOutlined,
  CarOutlined,
  ArrowUpOutlined,
  InsertRowRightOutlined,
  FieldTimeOutlined,
  EnvironmentOutlined,
  FileExcelOutlined,
  HeartOutlined,
  HistoryOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Rate, Progress, BackTop } from "antd";
import Header from "../../components/layouts/Header";
import moment from "moment";
import ItemRoom from "./components/itemRoom";
import CommentPage from "../../components/Comment";
import { bookingHotelAction, getListRoomAction } from "../../redux/actions";

import "./styles.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

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
function ListRoomPage({ listRoom, getListRoom, match, bookingHotelRoom, userInfo }) {
  const hotelId = match.params.id;
  const [roomSelected, setRoomSelected] = useState({});
  const [dateSelected, setDateSelected] = useState();
  // const [totalPrice, setTotalPrice] = useState(0);
  
  const currentDate = new Date();

  const [searchKey, setSearchKey] = useState({ userNum: "", price: "" });

  useEffect(() => {
    getListRoom({ id: hotelId });
  }, []);

  useEffect(() => {
    if (listRoom.data.id) {
      setRoomSelected(listRoom.data.rooms[0] || {});
    }
  }, [listRoom.data]);

  const filterListRoom = listRoom.data.rooms.filter((item) => {
    return (
      item.price.toString().indexOf(searchKey.price.trim()) !== -1 &&
      item.title.toString().indexOf(searchKey.userNum.trim()) !== -1
    );
  });

  function handleDate(value) {
    const [startDate, endDate] = value;
    setDateSelected([
      moment(startDate).format("YYYY/MM/DD"),
      moment(endDate).format("YYYY/MM/DD"),
    ]);
  }

  function showConfirmBooking(item) {
    const numDate = moment
      .duration(
        moment(dateSelected[1], "YYYY/MM/DD").diff(
          moment(dateSelected[0], "YYYY/MM/DD")
        )
      )
      .asDays();
    Modal.confirm({
      title: 'Xác nhận thông tin đặt khách sạn',
      icon: <ExclamationCircleOutlined />,
      width: 500,
      content: (
        <>
          <img
            alt="example"
            src={item.img}
            style={{ height: 200, width: '100%', objectFit: "cover" }}
          />
          <Descriptions bordered size="small">
            <Descriptions.Item span={3} label="Tên khách sạn">{listRoom.data.name}</Descriptions.Item>
            <Descriptions.Item span={3} label="Loại phòng">{item.title}</Descriptions.Item>
            <Descriptions.Item span={3} label="Ngày đặt">{dateSelected[0]}</Descriptions.Item>
            <Descriptions.Item span={3} label="Ngày trả">{dateSelected[1]}</Descriptions.Item>
            <Descriptions.Item span={3} label="Tổng ngày đặt">{numDate} đêm</Descriptions.Item>
            <Descriptions.Item span={3} label="Giá 1 đêm">{item.price.toLocaleString()} / đêm</Descriptions.Item>
            <Descriptions.Item span={3} label="Tổng tiền">{(numDate * item.price).toLocaleString()} VND</Descriptions.Item>
          </Descriptions>
        </>
      ),
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        bookingHotelRoom({
          userId: userInfo.data.id,
          hotelId: parseInt(hotelId),
          roomId: item.id,
          startDate: dateSelected[0],
          endDate: dateSelected[1],
          totalPrice: numDate * item.price,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  function handleBookingHotel(id) {
    if (!userInfo.data.id) {
      alert("Bạn cần đăng nhập!");
    } else if (!dateSelected) {
      alert("Cần chọn ngày đặt phòng!");
    } else {
      showConfirmBooking(id)
    }
  }

  function renderListRoom() {
    if (filterListRoom.load) return <p>loading...</p>;
    return filterListRoom.map((item, index) => {
      let isDisabled = false;

      if (dateSelected) {
        listRoom.data.bookingHotels.forEach((bookingItem, bookingIndex) => {
          if (
            ((moment(dateSelected[0], "YYYY/MM/DD").unix() -
              moment(bookingItem.startDate, "YYYY/MM/DD").unix() >=
              0 &&
              moment(bookingItem.endDate, "YYYY/MM/DD").unix() -
                moment(dateSelected[1], "YYYY/MM/DD").unix() >=
                0) ||
              (moment(dateSelected[1], "YYYY/MM/DD").unix() -
                moment(bookingItem.startDate, "YYYY/MM/DD").unix() >
                0 &&
                moment(bookingItem.startDate, "YYYY/MM/DD").unix() -
                  moment(dateSelected[0], "YYYY/MM/DD").unix() >
                  0) ||
              (moment(bookingItem.endDate, "YYYY/MM/DD").unix() -
                moment(dateSelected[0], "YYYY/MM/DD").unix() >
                0 &&
                moment(dateSelected[1], "YYYY/MM/DD").unix() -
                  moment(bookingItem.endDate, "YYYY/MM/DD").unix() >
                  0)) &&
            bookingItem.roomId === item.id
          ) {
            isDisabled = true;
          }
        });
      }

      return (
        <Col span={6}>
          <Card
            hoverable
            size="small"
            cover={
              <img
                alt="example"
                src={item.img}
                style={{ height: 200, objectFit: "cover" }}
              />
            }
            style={{ height: 400 }}
          >
            <h2 style={{ marginBottom: 8, fontWeight: 600, color: '#003c71', width: '100%' }}>{item.title} </h2>
            <ItemRoom key={index} description={item.description} />
            {!isDisabled
              ? (
                <>
                  <span className="price">{item.price.toLocaleString()} VND</span>
                  <Button
                    type="primary"
                    className="book"
                    onClick={() => handleBookingHotel(item)}
                  >
                    Đặt Phòng
                  </Button>
                </>
              )
              : (
                <Button size="large" danger style={{ margin: '8px 0 0 100px', transform: 'rotate(-15deg)' }}>
                  Hết Phòng
                </Button>
              )
            }
          </Card>
        </Col>
      );
    });
  }

  return (
    <>
      <div>
        <Row className="timkiem">
          <div className="alltimkiem">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              layout="inline"
              onFinish={(values) => {
                setSearchKey({ userNum: values.userNum, price: values.price });
              }}
            >
              <Col span={10}>
                <Form.Item name="userNum">
                  <Input
                    labelFontSize={100}
                    fontSize={100}
                    prefix={<SendOutlined />}
                    style={{
                      padding: "10px 50px",
                      height: 50,
                      borderRadius: 4,
                      backgroundColor: "white",
                    }}
                    onChange={(
                      e //setSearchKey(e.target.value)
                    ) =>
                      setSearchKey({ ...searchKey, userNum: e.target.value })
                    }
                    placeholder="Bạn cần nhập số người"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item name="dateBooking">
                  <DatePicker.RangePicker
                    labelFontSize={100}
                    fontSize={100}
                    onChange={(value) => handleDate(value)}
                    style={{
                      padding: "10px 50px",
                      width: "100%",
                      height: 50,
                      borderRadius: 4,
                      backgroundColor: "white",
                    }}
                    defaultValue={moment(currentDate)}
                    format="DD/MM/YYYY"
                    disabledDate={(nowDate) =>
                      nowDate && nowDate < moment().startOf("day")
                    }
                  />
                </Form.Item>
              </Col>
              {/* <Col span={7}>
              <Form.Item
                name="price"
              >
                <Input
                  labelFontSize={100}
                  fontSize={100} prefix={<SendOutlined />}
                  disabled
                  style={{
                    padding: '10px 50px',
                    height: 50, borderRadius: 4,
                    backgroundColor: "white"
                  }}
                  onChange={(e) => //setSearchKey(e.target.value)
                    setSearchKey({ ...searchKey, price: e.target.value })
                  }
                  placeholder="Chọn giá tiền"
                />
              </Form.Item>
            </Col> */}
              <Col span={3}>
                <Row style={{ width: "100%" }} justify="end">
                  <Button
                    style={{
                      padding: "10px 40px",
                      height: 50,
                      borderRadius: 4,
                      backgroundColor: "#ffe58f",
                      color: "#003a8c",
                      fontWeight: 600,
                    }}
                  >
                    Tìm
                  </Button>
                </Row>
              </Col>
            </Form>
          </div>
        </Row>

        <div className="bodyHotelDetail">
          <div className="bodyHotelDetail2">
            <div className="detailTrangchu">
              <ol className="breadcrumb" style={{ padding: "24px 0 8px" }}>
                <Space>
                  <HomeOutlined />
                </Space>
                <li>
                  <a className="item" disabled href="/du-lich/">
                    <i className="fa fa-home"></i>
                    <span>Trang chủ</span>
                  </a>
                </li>
                <i style={{ margin: "0px 10px" }}>|</i>
                <li>
                  <a className="item" disabled href="/du-lich/tour-da-nang">
                    <span>Khách sạn Việt Nam</span>
                  </a>
                </li>
                <i style={{ margin: "0px 10px" }}>|</i>
                <li className="active hidden-xs">
                  <a
                    className="item"
                    href="/du-lich/tour-da-nang-4n3d-hcm-da-nang-ba-na-hoi-an-hue-quang-binh/1189"
                  >
                    <span>Thông tin về khách sạn</span>
                  </a>
                </li>
              </ol>
              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <Row gutter={[16, 16]}>
                    <Col span={14}>
                      <img
                        src={listRoom.data.src[0]}
                        alt=""
                        width="100%"
                        height={316}
                        style={{ objectFit: "cover" }}
                      />
                    </Col>
                    <Col span={10}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <img
                            src={listRoom.data.src[1]}
                            alt=""
                            width="100%"
                            height={150}
                            style={{ objectFit: "cover" }}
                          />
                        </Col>
                        <Col span={12}>
                          <img
                            src={listRoom.data.src[2]}
                            alt=""
                            width="100%"
                            height={150}
                            style={{ objectFit: "cover" }}
                          />
                        </Col>
                        <Col span={12}>
                          <img
                            src={listRoom.data.src[3]}
                            alt=""
                            width="100%"
                            height={150}
                            style={{ objectFit: "cover" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Card>
                        <Tag color="#87d068" style={{ margin: "4px 0 6px" }}>
                          {listRoom.data.area}
                        </Tag>
                        <h1 className="HotelDetailName">
                          {" "}
                          {listRoom.data.name}{" "}
                        </h1>
                        <div>
                          <Rate disabled value={listRoom.data.rate} />
                        </div>
                        <Space>
                          <EnvironmentOutlined />
                          <div>{listRoom.data.address}</div>
                        </Space>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card>
                        <h3 className="diemnoibat">Điểm nổi bật về chỗ nghĩ</h3>
                        <Row gutter={32}>
                          <Col
                            span={8}
                            style={{ borderRight: "1px solid #cccccc" }}
                          >
                            <Space align="start" size={16}>
                              <HistoryOutlined
                                style={{ fontSize: 30, color: "#003a8c" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "#003a8c",
                                  }}
                                >
                                  Bàn tiếp tân 24H
                                </div>
                                <span className="note14">
                                  Nhận phòng không phức tạp
                                </span>
                              </div>
                            </Space>
                          </Col>
                          <Col
                            span={8}
                            style={{ borderRight: "1px solid #cccccc" }}
                          >
                            <Space align="start" size={16}>
                              <HeartOutlined
                                style={{ fontSize: 30, color: "#003a8c" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "#003a8c",
                                  }}
                                >
                                  Có các dịch vụ chiều lòng khách hàng
                                </div>
                                <span className="note14">
                                  Massage,xông hơi,bida,hồ bơi...
                                </span>
                              </div>
                            </Space>
                          </Col>
                          <Col span={8}>
                            <Space align="start" size={16}>
                              <FileExcelOutlined
                                style={{ fontSize: 30, color: "#003a8c" }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "#003a8c",
                                  }}
                                >
                                  Không hủy phòng
                                </div>
                                <span className="note14">
                                  Đã đặt phòng thì không được hủy.Đừng xem
                                  chúngtôi là trò chơi
                                </span>
                              </div>
                            </Space>
                          </Col>
                        </Row>
                        <ul style={{ paddingLeft: 20, margin: "16px 0 0" }}>
                          <li>
                            Cung cấp nhiều dịch vụ chất lượng và tiện nghi đa
                            dạng để bạn yên tâm tận hưởng kỳ nghỉ của mình
                          </li>
                          <li>
                            Chỗ nghỉ này được trang bị nhiều tiện nghi đa dạng,
                            hứa hẹn sẽ làm hài lòng ngay cả những khách hàng khó
                            tính nhất
                          </li>
                          <li>
                            Các trang thiết bị giải trí như phòng thể dục, phòng
                            xông hơi khô, hồ bơi trong nhà, spa, massage sẽ đem
                            lại những giờ phút thư giãn sau một ngày bận rộn
                          </li>
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Card
                    title="Đánh giá chất lượng khách sạn"
                    style={{ width: "100%", marginBottom: 16 }}
                  >
                    <div>
                      <div>
                        <label htmlFor="">Tuyệt vời</label>
                        <Progress percent={90} status="active" />
                      </div>
                      <div>
                        <label htmlFor="">Tốt</label>
                        <Progress percent={80} status="active" />
                      </div>
                      <label htmlFor="">Không đạt yêu cầu</label>
                      <Progress percent={10} status="exception" />
                    </div>
                  </Card>
                  <Card
                    size="small"
                    title="Thông tin vị trí"
                    cover={
                      <img
                        alt="example"
                        src="https://previews.123rf.com/images/pingebat/pingebat1507/pingebat150700119/42663707-a-generic-city-map-of-an-imaginary-city-.jpg"
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    }
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Space>
                        <EnvironmentOutlined />
                        Vị trí hiếm có
                      </Space>
                    </div>
                    <div>
                      <Space>
                        <InsertRowRightOutlined />
                        Địa bàn phổ biến
                      </Space>
                    </div>
                    <Row
                      justify="space-between"
                      style={{
                        margin: "8px 0",
                        padding: "8px 0",
                        borderTop: "1px solid #f5f5f5",
                        borderBottom: "1px solid #f5f5f5",
                      }}
                    >
                      <Space>
                        <CarOutlined />
                        Đỗ xe
                      </Space>
                      <span className="free">Miễn phí</span>
                    </Row>
                    <div>
                      <Space>
                        <AimOutlined />
                        Các địa điểm nổi tiếng
                      </Space>
                      <ul className="itemnote">
                        <li className="itemnote1">Vịnh Hạ Long</li>
                        <li className="itemnote1">Phong Nha Kẻ Bàng</li>
                        <li className="itemnote1">Hội An</li>
                        <li className="itemnote1">Biển Mỹ Khê Đà Nẵng</li>
                        <li className="itemnote1">Mũi né Cà Mau</li>
                        <li className="itemnote1">Chùa Linh Ứng</li>
                      </ul>
                    </div>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card size="small">
                    <Space size={16}>
                      <FieldTimeOutlined
                        style={{ fontSize: 40, color: "#003a8c" }}
                      />
                      <div>
                        <div style={{ fontSize: 20, color: "#003a8c" }}>
                          Ngày quý khách chọn là ngày phổ biến đối với khách du
                          lịch
                        </div>
                        <span className="bcd">
                          Cứ 60 phút là có khách đặt phòng trên đây
                        </span>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>

            <div style={{ width: "100%" }}>
              <Divider
                orientation="left"
                style={{ fontSize: 24, color: "#003c71" }}
              >
                Danh sách phòng của chúng tôi
              </Divider>
            </div>
            {filterListRoom.length != 0 ? (
              <Row gutter={[16, 16]}>{renderListRoom()}</Row>
            ) : (
              <Row justify="center">
                <Col span={24}>
                  <div className="khongcokq">Không có kết quả...</div>
                </Col>
              </Row>
            )}
            <Card size="small" style={{ margin: "16px 0" }}>
              <Space size={16}>
                <GlobalOutlined style={{ fontSize: 40, color: "#003a8c" }} />
                <div>
                  <div style={{ fontSize: 20, color: "#003a8c" }}>
                    Đừng bỏ lỡ cơ hội lần này
                  </div>
                  <span className="bcd">
                    Nhanh tay chọn cho mình 1 phòng yêu thích để cùng nhau du
                    lịch nào
                  </span>
                </div>
              </Space>
            </Card>
            <div style={{ width: "100%" }}>
              <Divider
                orientation="left"
                style={{ fontSize: 24, color: "#003c71" }}
              >
                Đánh giá tổng thể
              </Divider>
            </div>
            <Row gutter={16}>
              <Col span={18}>
                <Card>
                  <Row gutter={16}>
                    <Col span={8}>
                      <div>
                        <h3>Điểm số trên Webboking</h3>
                        <Progress percent={90} status="active" />
                      </div>
                      <div className="danhgiashow">
                        <span className="score">{listRoom.data.rate}.0</span>
                        <span className="score-description">
                          Trên cả tuyệt vời
                        </span>
                        <h3 className="score-danhgia">
                          Dựa trên đánh giá khách hàng
                        </h3>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="danhgiacenter">
                        <label>Độ sạch sẽ</label>
                        <Progress
                          percent={90}
                          className="progress"
                          status="active"
                          size="small"
                        />
                        <label>Thái độ phục vụ</label>
                        <Progress
                          percent={95}
                          className="progress"
                          status="active"
                          size="small"
                        />
                        <label>Đánh giá tiền</label>
                        <Progress
                          percent={99}
                          className="progress"
                          status="active"
                          size="small"
                        />
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="thongtinluuy">
                        <h3>Thông tin cần lưu ý</h3>
                        <div className="thongtinluuy1">
                          <div className="notethongbao">
                            <h4>Số lượng phòng:</h4>
                            <span className="notethongbaocon">200</span>
                          </div>
                          <div className="notethongbao">
                            <h4>Điện áp trong phòng:</h4>
                            <span className="notethongbaocon">220V</span>
                          </div>
                          <div className="notethongbao">
                            <h4>Khách sạn được xây vào năm:</h4>
                            <span className="notethongbaocon">2019</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Divider
                  orientation="left"
                  style={{ fontSize: 24, color: "#003c71" }}
                >
                  Nhận xét từ du khách
                </Divider>
                <Card>
                  <CommentPage hotelId={hotelId} />
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="Vourcher + Combo khuyến mãi ngày hè"
                  style={{ width: "100%", fontSize: 16 }}
                  cover={
                    <img
                      src={listRoom.data.src[1]}
                      alt=""
                      width="100%"
                      height={200}
                      style={{ objectFit: "cover" }}
                    />
                  }
                >
                  <div>
                    <Space>
                      <UsergroupAddOutlined />
                      Tối đa 3 người lớn và 2 trẻ em
                    </Space>
                  </div>
                  <div>
                    <Space>
                      <BankOutlined />
                      Rộng 40m2
                    </Space>
                  </div>
                  <div>
                    <Space>
                      <UsergroupAddOutlined />
                      Một giường đôi
                    </Space>
                  </div>
                  <div>
                    <Space>
                      <VideoCameraOutlined />
                      View nhìn ra biển
                    </Space>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <BackTop className="backtop">
        <div style={style}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
    </>
  );
}

const mapStateToProps = (state) => {
  const { listRoom } = state.hotelReducer;
  const { userInfo } = state.userReducer;
  return {
    listRoom,
    userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListRoom: (params) => dispatch(getListRoomAction(params)),
    bookingHotelRoom: (params) => dispatch(bookingHotelAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListRoomPage);
