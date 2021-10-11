// import { useState } from 'react';
import { Col, Card, Row } from 'antd';

import history from '../../../utils/history';
import '../styleTour.css'

function ItemTour(props) {
  const { title, link, description, rate, price, id, key } = props;

  // const [isEdit, setIsEdit] = useState(false);
  // const [isShowDescription, setIsShowDescription] = useState(false);
  // const [editForm] = Form.useForm();
  const { Meta } = Card;

  function renderUrlTour() {
    return description.map((item, index) => {
      return (
        
          <li style={{display:"inline-block", padding:"0px 5px" }}>
            {item}
          </li>
      )
    })
    
  }
  
  return (
      <Col xxl={6} xl={8} lg={12} md={12} sm={24} >
        <Card
          hoverable
          // style={{ width: 340}}
          cover={<img alt="example" src={link} />}
          onClick={() => history.push(`/tours/${id}`)}
        >
          {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
          <div>
          {
          rate > 4 ? <div className="isHot">Tour bán chạy</div> : null
          }
            <Row>
              <div className="tourItemName" style={{fontWeight:600, height:76}}>
                <a>
                  {title}
                </a>
              </div>
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
            <Row >
              <ul style={{ color: "#00C1DE", paddingLeft:0, height:76, marginTop:10, marginLeft:-5,listStyle:"none" }}>
                {renderUrlTour()}
              </ul>
            </Row>
            <Row justify="end">
                <div style={{ color: "#00C1DE", fontSize: 20, fontWeight: 500}}>{price.toLocaleString()} <span style={{fontSize:14}}>VNĐ</span></div>
            </Row>
          </div>
        </Card>
      </Col>
  );
}

export default ItemTour;