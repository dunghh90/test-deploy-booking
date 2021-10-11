import { Button, Card, Col, Row, Space, Divider, Tag } from 'antd';

import { connect } from 'react-redux';
import { getListHotelAction, getLocationListAction } from '../../redux/actions';
import { useEffect, useState } from 'react';
import history from '../../utils/history';
import { Rate, BackTop } from 'antd';
import './styles.css';
import { EnvironmentOutlined, TeamOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Slipder from '../../components/slickHotel';
import Siderba from '../../components/Siderba';


const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
function ListHotelPage({
  listHotel,
  getListHotel,
  location,
  getLocationList,
  locationList,
}) {
  const locationId = location.state?.locationId;

  const [locationSelected, setLocationSelected] = useState(undefined);
  const [rateSelected, setRateSelected] = useState(undefined);

  useEffect(() => {
    getLocationList(
      {
        page: 1,
        limit: 10,
      }
    );
    getListHotel({
      page: 1,
      limit: 10,
      ...locationSelected >= 0 & { id: locationSelected }
    });
  }, []);

  useEffect(() => {
    if (locationId) setLocationSelected(locationId)
  }, [locationId])

  function handleFilterLocation(id) {
    setLocationSelected(id);
    getListHotel({
      page: 1,
      limit: 10,
      id,
      rate: rateSelected,
    });
  }

  function handleFilterRate(rate) {
    setRateSelected(rate);
    getListHotel({
      page: 1,
      limit: 10,
      id: locationSelected,
      rate,
    });
  }

  function loadmoreHotel() {
    getListHotel({
      more: true,
      page: listHotel.page + 1,
      limit: 10,
      id: locationSelected,
      rate: rateSelected,
    });
  }

  function renderListHotel() {
    if (listHotel.load) return <p>Loading...</p>;
    if (listHotel.data.length === 0) return <p style={{ textAlign: 'center' }}>Không có dữ liệu</p>;
    return listHotel.data.map((item, index) => {
      return (
        <Card
          key={`hotel-${index}`}
          hoverable
          // title={item.area}
          cover={<div alt="example" src="" />}
          style={{ marginTop: 16, border: 'none' }}
          onClick={() => history.push(`/hotel/${item.id}`)}
        >
          <div className="optiondetail">
            <img className="imgAll" src={item.img} alt="" />
            <div className="option">
              <h1 className="name" > {item.name} </h1>
              <div>
                <Rate disabled value={item.rate} />
              </div>
              <Tag color="#87d068" style={{ margin: '4px 0 6px' }}>{item.area}</Tag>
              <Space>
                <EnvironmentOutlined />
                <div>{item.address}</div>
              </Space>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.note
                }}>
              </div>
              <Space style={{ marginTop: 16 }}>
                <TeamOutlined />
                <div>{item.comment}</div>
              </Space>
              <div className="priceandnote">
                <div className="pricerenhat">Giá 1 đêm của khách sạn từ</div>
                <div className="price1">{item.Price.toLocaleString()} VND</div>
                <div>Lưu ý: Giá của khách sạn cao theo số người và chất lượng phòng</div>
              </div>
            </div>
          </div>
        </Card>
      )
    });
  }

  return (
    <div className="allList">
      <div>
        <div>
          < Slipder />
          <Divider orientation="left" style={{ fontSize: 24, color: '#003c71' }}>Danh sách Khách sạn</Divider>
          {/* <span className="hotro">Cần hỗ trợ liên hệ: 0702321494</span> */}
          <Row gutter={[16, 16]} justify="center">
            <Col span={7}>
              <Siderba
                locationList={locationList}
                handleFilterLocation={handleFilterLocation}
                handleFilterRate={handleFilterRate}
                locationSelected={locationSelected}
                rateSelected={rateSelected}
              />
            </Col>
            <Col span={17}>
              {renderListHotel()}
              {listHotel.data.length !== 0 && listHotel.data.length % 10 === 0 && (
                <Row justify="center" style={{ marginTop: 16 }}>
                  <Button onClick={() => loadmoreHotel()}>Xem thêm khách sạn</Button>
                </Row>
              )}
            </Col>
            <Row>
              <BackTop className="backtop">
                <div style={style}><ArrowUpOutlined /></div>
              </BackTop>
            </Row>
          </Row>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { listHotel, locationList } = state.hotelReducer;
  return {
    listHotel,
    locationList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListHotel: (params) => dispatch(getListHotelAction(params)),
    getLocationList: (params) => dispatch(getLocationListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListHotelPage);



