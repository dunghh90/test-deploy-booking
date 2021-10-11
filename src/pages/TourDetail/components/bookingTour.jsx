import { Breadcrumb, Card, Col, Row, Form, Input, Button, DatePicker, Space, InputNumber, Modal, notification} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { HomeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { getTourDetailAction, bookingTourAction } from "../../../redux/actions";
import moment from 'moment';
import history from '../../../utils/history';

// import './style.css'

import { Content } from "antd/lib/layout/layout";

function BookingTourPage(props) {
  const { tourDetail, getTourDetail, userInfo, tourId, bookingTour, customerRemain, setCustomerRemain  } = props;

  var nowDate = new Date();
  useEffect(() => {
    getTourDetail({ id: tourId });
  }, [])

  useEffect(() => {
    if (tourDetail.data.id) {
      setMoney(tourDetail.data.price);
      countCustomerRemain(dateSelected);
    }

  }, [tourDetail.data])

  const [money, setMoney] = useState(tourDetail.data.price);
  const [ checkCustomerRemain,  setCheckCustomerRemain] = useState(true);
  const [ dateSelected, setDateSelected ] = useState(moment(nowDate).format("DD/MM/YYYY"));

  function countCustomerRemain(dateStart) {
    let customerBooking = 0;
    const listBooking = tourDetail.data.bookingTours.filter((item) => {
      return dateStart.trim().toLowerCase().indexOf(item.startDate.trim().toLowerCase()) !== -1;
    })
    listBooking.forEach((item) => {
      customerBooking += item.numberAdults + item.numberChild;
    });
    if (customerBooking >= tourDetail.data.maxCustomer) {
      setCheckCustomerRemain(false);
    } else {
      setCheckCustomerRemain(true);
    }
    setCustomerRemain(tourDetail.data.maxCustomer - customerBooking);
  }

  function updatePrice(values) {
    setDateSelected(values.dateStartBooking?values.dateStartBooking.format("DD/MM/YYYY"):'');
    const listBooking = tourDetail.data.bookingTours.filter((item) => {
      return moment(values.dateStartBooking).format("DD/MM/YYYY").trim().toLowerCase().indexOf(item.startDate.trim().toLowerCase()) !== -1;
    })
    let customerBooking = 0;
    listBooking.forEach((item) => {
      customerBooking += item.numberAdults + item.numberChild;
    });
    if (customerBooking >= tourDetail.data.maxCustomer) {
      setCheckCustomerRemain(false);
    } else {
      setCheckCustomerRemain(true);
    }
    setCustomerRemain(tourDetail.data.maxCustomer - customerBooking);
    setMoney(tourDetail.data.price * values.countAdults + tourDetail.data.price * values.countChild * 0.5)
  }

  function handleBookingTour(values) {
    if (!userInfo.data.id) {
      alert('Bạn cần đăng nhập!');
      history.push({
        pathname: '/login',
        state: {
          prevPath: `tours/${tourId}`
        }
      })
    } else if (!values.dateStartBooking) {
      alert('Cần chọn ngày đặt tour!');
    } else {
      // localStorage.setItem('carts', JSON.stringify(newCartList));
      // TODO Check tourId và startDate nếu tồn tại trong db thì ko add booking
      const listBooking = tourDetail.data.bookingTours.filter((item) => {
        return moment(values.dateStartBooking).format("DD/MM/YYYY").trim().toLowerCase().indexOf(item.startDate.trim().toLowerCase()) !== -1;
      })
      let customerBooking = 0;
      const numBooking = values.countAdults + values.countChild;
      listBooking.forEach((item) => {
        customerBooking += item.numberAdults + item.numberChild;
      });
      if (numBooking + customerBooking > tourDetail.data.maxCustomer) {
        notification.open({
          message: 'Không thể đặt',
          description:
          "Số lượng khách còn lại có thể đặt: " + (tourDetail.data.maxCustomer - customerBooking),
          type:"warning"
        });
      } else {
        
        showConfirmBooking(values, tourDetail.data.maxCustomer - (numBooking + customerBooking));
        
      }

    }
  }
  
  function showConfirmBooking(values, cusRemain) {
    Modal.confirm({
      title: 'Thông tin tour đã đặt:',
      icon: <ExclamationCircleOutlined />,
      content: renderConfirmTour(values),//'Tour Đà Nẵng 2 ngày 3 đêm',
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        console.log('OK');
        bookingTour({
          userId: userInfo.data.id,
          tourId: parseInt(tourId),
          startDate: moment(values.dateStartBooking).format("DD/MM/YYYY"),
          numberAdults: values.countAdults,
          numberChild: values.countChild,
          totalPrice: money
        });
        setCustomerRemain(cusRemain);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function renderConfirmTour(values) {
    return (
      <>
        <Row ><h3>{tourDetail.data.name}</h3></Row>
        <Row>
          <Col span={10}>Số lượng người lớn: </Col>
          <Col span={14}>{values.countAdults}</Col>
          <Col span={10}>Số lượng trẻ em: </Col>
          <Col span={14}>{values.countChild}</Col>
          <Col span={24}>Tổng tiền: {money.toLocaleString()} VNĐ</Col>
        </Row>
      </>
    )
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 13 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 11 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 24,
        offset: 0,
      }
    },
  };

  return (
    <>

    <Form
        {...formItemLayout}
        // layout={formLayout}
        // form={form}
        initialValues={{ 
          dateStartBooking:  moment(nowDate),
          countAdults: 1,
          countChild: 0,
        }}
        style={{padding:0}}
        onValuesChange={(_,allValues) => updatePrice(allValues)}
        onFinish={(values) => handleBookingTour(values)}
      >
        <Form.Item label="Chọn ngày khởi hành" name="dateStartBooking">
          <DatePicker format="DD/MM/YYYY" disabledDate={(nowDate) => nowDate && nowDate < moment().startOf('day').add(props.skipDays, 'day')}/>
        </Form.Item>
        <Form.Item label="Người lớn" name="countAdults">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="Trẻ em" name="countChild">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>

        <div style={{ fontSize: 24, color: "#ffbd00", float: "right", fontWeight: "bold" }}>{money && (money.toLocaleString() + " VND")}</div>
        </Form.Item>
        {/* <Form.Item {...buttonItemLayout}> */}
        <Form.Item {...tailFormItemLayout} style={{width:"100%"}} >
          {/* <Button className="login-form-button" disabled={!checkCustomerRemain} htmlType="submit" style={{ width: "100%", height:40, fontSize:18, {checkCustomerRemain?backgroundColor:"#ffa940":backgroundColor:"gray"}, color:"white" }}>{checkCustomerRemain?"Đặt tour":"Hết chổ"}</Button> */}
          {checkCustomerRemain ? (
            <Button className="login-form-button" htmlType="submit" style={{ width: "100%", height:40, fontSize:18, backgroundColor:"#ffa940", color:"white" }}>Đặt tour</Button>
            
            ): (
            <Button className="login-form-button" disabled style={{ width: "100%", height:40, fontSize:18, backgroundColor:"gray", color:"white" }}>Hết chổ</Button>
              
          )}

          {/* {isDisabled && (
            <Button type="primary" disabled className="book" >Hết Phòng</Button>
          )}
          {!isDisabled && (
            <Button type="primary" className="book" onClick={() => handleBookingHotel(item.id, item.price)}>Đặt Phòng</Button>
          )} */}
          
        </Form.Item>
    </Form>

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
    </Row>*/}
    </>
  )
}

const mapStateToProps = (state) => {
  const { tourDetail } = state.tourReducer;
  const { userInfo } = state.userReducer;
  return {
    tourDetail,
    userInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourDetail: (params) => dispatch(getTourDetailAction(params)),
    bookingTour: (params) => dispatch(bookingTourAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingTourPage);