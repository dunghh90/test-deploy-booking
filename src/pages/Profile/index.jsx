import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Divider,
  Button,
  Row,
  Col,
  Radio,
  Menu,
  Form,
  Input,
  DatePicker,
  Table,
} from "antd";
import {
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import moment from "moment";
import {
  getBookingHotelsAction,
  getBookingTourAction,
  updateProfileAction,
} from "../../redux/actions";
import { registerAction } from "../../redux/actions";

function ProfilePage({
  bookingTours,
  getBookingHotels,
  getBookingTours,
  updateUser,
  bookingHotels,
  userInfo,
  match,
}) {
  const userId = match.params.id;
  const [selectObject, setSelectObject] = useState(1);
  const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));

  const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  };
  useEffect(() => {
    getBookingHotels({
      page: 1,
      limit: 10,
      userId: userId,
    });
    getBookingTours({
      page: 1,
      limit: 10,
      userId: userId,
    });
  }, []);

  if (!userInfo.data.id && !userInfoLocal) {
    return <Redirect to="/login" />;
  }

  function updateUserInfo(values) {
    const newValues = {
      ...values,
      id: userInfo.data.id,
      birthday: moment(values.birthday).format("YYYY/MM/DD"),
    };
    updateUser(newValues);
  }

  function changePassword(values) {
    const newValues = {
      ...values,
      id: userInfo.data.id,
    };
    updateUser(newValues);
  }

  function renderUserInfo() {
    return (
      <>
        <Form
          // form={form}
          {...layout}
          name="changeInfo"
          onFinish={(values) => updateUserInfo(values)}
          initialValues={{
            email: userInfoLocal.email,
            name: userInfoLocal.name,
            phone: userInfoLocal.phone,
            gender: userInfoLocal.gender,
            birthday: moment(userInfoLocal.birthday, "YYYY/MM/DD"),
          }}
          style={{ width: 700 }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="H??? v?? t??n"
            rules={[
              {
                required: true,
                message: "H??? v?? t??n ch??a ???????c nh???p!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Nh???p E-mail kh??ng h???p l???!",
              },
              {
                required: true,
                message: "E-mail ch??a ???????c nh???p!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="S??? ??i???n tho???i"
            rules={[
              {
                required: true,
                message: "S??? ??i???n tho???i ch??a ???????c nh???p!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gi???i t??nh"
            rules={[{ required: true, message: "Ch??a ch???n gi???i t??nh!" }]}
          >
            <Radio.Group value={2}>
              <Radio value="male">Nam</Radio>
              <Radio value="female">N???</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="birthday"
            label="Ng??y sinh"
            rules={[{ required: true, message: "Ng??y sinh ch??a ???????c nh???p!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Button
                type="primary"
                style={{ width: "150px" }}
                htmlType="submit"
              >
                L??u
              </Button>
            </Col>
          </Row>
        </Form>
        {/* { renderUserInfo()} */}
      </>
    );
  }

  function renderChangePass() {
    return (
      <>
      <div className='localProfileLine' style={{width:'100%'}}>?????i M???t Kh???u</div>
      <Form
        {...layout}
        name="changePassword"
        onFinish={(values) => changePassword(values)}
        style={{ width: 700 }}
        scrollToFirstError
      >
        <Form.Item
          name="password"
          label="M???t kh???u hi???n t???i"
          rules={[
            {
              required: true,
              message: "M???t kh???u hi???n t???i ch??a ???????c nh???p!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="passwordNew"
          label="M???t kh???u m???i"
          rules={[
            {
              required: true,
              message: "M???t kh???u m???i ch??a ???????c nh???p!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label="X??c nh???n m???t kh???u"
          rules={[
            {
              required: true,
              message: "X??c nh???n m???t kh???u ch??a ???????c nh???p!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('passwordNew') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Nh???p confirm password kh??ng tr??ng kh???p!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row>
          <Col span={12}></Col>
          <Col span={12}>
            <Button type="primary" style={{ width: "150px" }} htmlType="submit">
              X??c nh???n
            </Button>
          </Col>
        </Row>
      </Form>
      </>
    );
  }

  function renderHistoryBookingHotel() {
    const tableColumn = [
      {
        title: 'T??N KH??CH S???N',
        dataIndex: 'hotelName',
        key: 'hotelName',
        with: 230,
      },
      {
        title: 'LO???I PH??NG',
        dataIndex: 'roomName',
        key: 'roomName',
        with: 230,
      },
      {
        title: 'GI??',
        dataIndex: 'price',
        key: 'price',
        with: 230,
      },
      {
        title: 'NG??Y ?????T',
        dataIndex: 'date',
        key: 'date',
        with: 230,
      },
    ];
    const tableData = bookingHotels.data?.map((item) => {
      return {
        ...item,
        hotelName: item.hotel.name,
        roomName: item.room.title,
        price: item.totalPrice.toLocaleString() + " VN??",
        date: `${item.startDate} - ${item.endDate}`,
        key: item.id,
      };
    });
    return (
      <Table columns={tableColumn} dataSource={tableData} pagination={false} style={{ width: '100%' }} />
    );
  }
  function renderHistoryBookingTour() {
    const tableColumn = [
      {
        title: "TOUR",
        dataIndex: "tourName",
        key: "tourName",
      },
      {
        title: "NG?????I L???N",
        dataIndex: "adults",
        key: "adults",
      },

      {
        title: "TR??? EM",
        dataIndex: "child",
        key: "child",
      },
      {
        title: "GI??",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "NG??Y ?????T",
        dataIndex: "date",
        key: "date",
      },
    ];
    const tableData = bookingTours.data.data.map((item) => {
      return {
        ...item,
        tourName: item.tour.name,
        price: item.totalPrice.toLocaleString() + " VN??",
        adults: item.numberAdults,
        child: item.numberChild,
        date: item.startDate,
        key: item.id,
      };
    });
    return (
      <Table columns={tableColumn} dataSource={tableData} pagination={false} style={{ width: '100%' }} />
    );
  }

  function renderHistory() {
    return (
      <div style={{ width: '100%' }}>
        <Divider
          orientation="left"
          style={{ color: "#003c71", marginTop: 0 }}
        >
          L???ch s??? book kh??ch s???n
        </Divider>
        <Row>{renderHistoryBookingHotel()}</Row>
        <Divider
          orientation="left"
          style={{ color: "#003c71", marginTop: 32 }}
        >
          L???ch s??? book tour
        </Divider>
        <Row>{renderHistoryBookingTour()}</Row>
      </div>
    );
  }
  function renderContent() {
    if (selectObject == 1) {
      return renderUserInfo();
    } else if (selectObject == 2) {
      return renderChangePass();
    } else {
      return renderHistory();
    }
  }

  return (
    <Row gutter={16} style={{ padding: "32px 0 0", margin: '50px auto 32px', maxWidth: 1400, width: '100%' }}>
      <Col span={4}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <Menu.SubMenu
            key="userInfo"
            icon={<UserOutlined />}
            title="Th??ng tin c???a t??i"
          >
            <Menu.Item key="1" onClick={() => setSelectObject(1)}>
              T??i kho???n
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setSelectObject(2)}>
              ?????i m???t kh???u
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            key="userHistory"
            icon={<LaptopOutlined />}
            onClick={() => setSelectObject(3)}
          >
            L???ch s??? booking
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={18}>
          <div style={{ backgroundColor: "white", padding: 20, height: "100%" }}>
          <Row>
            {renderContent()}

          </Row>
          </div>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  const { bookingHotels } = state.bookingHotelReducer;
  const { bookingTours } = state.bookingTourReducer;
  const { userInfo } = state.userReducer;

  return {
    bookingTours,
    bookingHotels,
    userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookingHotels: (params) => dispatch(getBookingHotelsAction(params)),
    getBookingTours: (params) => dispatch(getBookingTourAction(params)),
    getProfileList: (params) => dispatch(registerAction(params)),
    updateUser: (params) => dispatch(updateProfileAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
