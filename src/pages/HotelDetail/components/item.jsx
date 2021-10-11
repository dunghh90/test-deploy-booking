
import { Col, Card,Row} from 'antd';




function ImgRoom(props) {
  const {  src } = props;

  // const [isEdit, setIsEdit] = useState(false);
  // const [isShowDescription, setIsShowDescription] = useState(false);
  // const [editForm] = Form.useForm();
  const { Meta } = Card;

  function renderImg() {
    return src.map((item, index) => {
      return (
        <Row justify="center" >
        <Col span = {18}>
          <Row >
            <Col span ={9}>
              <img className ="img2" src={item.src[0]} alt="" />
  
            </Col>
            <Col span ={9} >
              <Row >
              <img className ="img2" src={item.src[1]} alt="" />
              </Row>
              <Row gutter={[8, 8]}>
                <Col span ={12}>
              <img className ="img3" src={item.src[2]} alt="" />
                </Col>
                <Col span ={12}>
              <img className ="img3" src={item.src[3]} alt=""/>
                </Col>
              </Row>
            </Col>
           
          </Row>
          <Row>
              <div className ="layout">minh</div>
            </Row>
        </Col>
        <Col span = {6}>
          <img className ="img4" src="https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg" alt="" />
        </Col>
      </Row>
      )
    })

  }
  return (
      <Col>
          {renderImg()}  
      </Col>
  );
}

export default ImgRoom;
