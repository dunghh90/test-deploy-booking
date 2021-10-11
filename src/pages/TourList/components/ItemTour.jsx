// import { useState } from 'react';
import { Row, Col, Card, Image, Space } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { IoAirplaneOutline, IoCarOutline } from "react-icons/io5";


import history from '../../../utils/history';

function ItemTour(props) {
  const { title, link, description, price, startDate, rate, time, date, id } = props;

  // const [isEdit, setIsEdit] = useState(false);
  // const [isShowDescription, setIsShowDescription] = useState(false);
  // const [editForm] = Form.useForm();
  const { Meta } = Card;

  function renderUrlTour() {
    return description.map((item, index) => {
      return (
        
          <li style={{display:"inline-block", padding:"0px 5px"}}>
            {item}
          </li>
      )
    })

  }

  return (
    <div style={{ padding: 0, marginBottom: 10, backgroundColor: "white" }}>

      <Card
        size="small"
        hoverable
        onClick={() => history.push(`/tours/${id}`)}
      >
        {
          rate > 4 ? <div className="isHot">Tour bán chạy</div> : null
        }
        <Row gutter={24}>
          <Col span={6}>
            {/* <img src={link} style={{width:"100%", cursor:"pointer"}}/> */}
            <div style={{backgroundImage: `url(${link})`, width:"100%", height:150}}></div>
            {/* <Image
            width={200}
            src={link}
            /> */}
          </Col>
          <Col span={10} style={{ marginTop: 10 }}>
            <Row>
              <Col>
                <div className="tourItemName" style={{fontWeight:600}}>
                  <a>
                    {title}
                  </a>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <div>
                <span className="score-container">
                  <span className="score">{rate}.0</span>
                  <span className="score-description">Tuyệt vời</span>
                </span>
                <span>| 1 đánh giá</span>
              </div>
            </Row>
            <Row justify="space-between" style={{ margin: "10px 0px" }}>
              <div>Mã: TO123</div>
              <div><FieldTimeOutlined /> {time}</div>
              <div>Phương tiện: <IoAirplaneOutline /><IoCarOutline /></div>
            </Row>
            <Row>
              <ul style={{ color: "#00C1DE", paddingLeft:0, marginLeft:-5,listStyle:"none" }}>
                {renderUrlTour()}
              </ul>
            </Row>
          </Col>
          <Col span={8} style={{ marginTop: 10 }}>
            <Row justify="end">
              <div>
                <div style={{textAlign:"right"}}>Khởi hành: {date}</div>
                <div style={{textAlign:"right", color: "#00C1DE", fontSize: 20, fontWeight: 500}}>{price.toLocaleString()} VNĐ</div>
                <div style={{textAlign:"right", color: "gray", fontSize:13}}>Áp dụng cho nhóm trên 2 khách</div>
              </div>
            </Row>
          </Col>
        </Row>
      </Card>

    </div>
  );
}

export default ItemTour;
