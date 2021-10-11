import { Col, Layout,  Input, Form, Button, Row, List, DatePicker } from 'antd';
import { useEffect, useState, URLSearchParams } from 'react';
import { connect } from 'react-redux';
import { EnvironmentOutlined, SendOutlined } from '@ant-design/icons';

import moment from 'moment';

import { getTourListAction, getLocationListAction, getTopicTourListAction } from '../../redux/actions';
import ItemTour from './components/ItemTour'
import './styleTour.css'

function TourListPage({ 
  getTourList, 
  getLocationList,
  topicTourList,
  getTopicTourList,
  tourList,
  locationList,
  match,
  location
}) {

  const topicTourId = location.topicTourId? location.topicTourId : '';
  const [topicSelected, setTopicSelected] = useState(topicTourId);
  console.log("🚀 ~ file: index.jsx ~ line 25 ~ location", location)
  
  const [locationSelected, setLocationSelected] = useState(null);
  
  // const [keySearchLocation, setKeySearchLocation] = useState(match.params.keySearch?match.params.keySearch:'');
  const [keySearchLocation, setKeySearchLocation] = useState(location.state?.location?location.state.location:'');
  const [keySearchFrom, setKeySearchFrom] = useState(location.state?.from?location.state.from:'');
  const [dateBookingSelected, setDateBookingSelected ] = useState(location.state?.date?location.state.date:moment(new Date()).format("DD/MM/YYYY"));

  

  const locationId = match.params.id;
  // const newVal = location.state?.prevPath?{...values,prevPath: location.state.prevPath}:values;
  
  useEffect(() => {
    getLocationList({
      page: 1,
      limit: 15
    }
    );
    getTopicTourList();
    getTourList({
      page: 1,
      limit: 10,
      locationId,
      topicTourId
    });
  }, []);

  useEffect(() => {
    getTourList({
      page: 1,
      limit: 10
    });
  }, [keySearchLocation]);

  const filterTourList = tourList.data.filter((item) => {
    return item.location.name.trim().toLowerCase().indexOf(keySearchLocation.trim().toLowerCase()) !== -1
     && 
     item.topicTour.id.toString().indexOf(topicSelected.toString()) !== -1
  })
  let filterLocationById = locationList.data.filter((item) => {
    return item.id == locationSelected;
  })
  let filterTopicById = topicTourList.data.filter((item) => {
    return item.id == topicSelected;
  })

  function handleFilterLocaiton(id) {
    setTopicSelected('');
    setKeySearchLocation('');
    setLocationSelected(id);
    getTourList({
      page: 1,
      limit: 10,
      locationId: id,
    })
  }
  function handleFilterTopic(id) {
    setKeySearchLocation('');
    setTopicSelected(id);
    setLocationSelected(null);
    getTourList({
      page: 1,
      limit: 10,
      topicTourId: id,
    })
  }
  const currentDate = new Date();
  function renderTourList() {
    if (tourList.load) return <p>Loading...</p>;

    return (
      <>
      <Row className="timkiem" >
          <Form
            name="basic"
            initialValues={{ location: '', dateBooking: moment(currentDate) }}
            layout="inline"
            onFinish={(values) => {
              setLocationSelected(null);
              setKeySearchLocation(values.location); 
              setKeySearchFrom(values.placeFrom); 
              setDateBookingSelected(moment(values.dateBooking).format("DD/MM/YYYY"));
              setTopicSelected('');
              getTourList({
                page: 1,
                limit: 10
              });
            }}
          >
            <Col span={7}>
                <Form.Item
                  name="location"
                >
                  <Input  fontSize={100} prefix={<EnvironmentOutlined />} style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"white"}} placeholder="Bạn muốn đi đâu?" />
                </Form.Item>
              </Col>
            <Col span={7}>
              <Form.Item
                  name="dateBooking"
                >
              <DatePicker style={{padding: '10px 50px', width:'100%', height:50, borderRadius:4, backgroundColor:"white"}} format="DD/MM/YYYY"/>
              </Form.Item>
            </Col>
            <Col span={7}>
            <Form.Item
                  name="placeFrom"
                >
              <Input labelFontSize={100} fontSize={100} prefix={<SendOutlined />} style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"white"}} placeholder="Khởi hành từ" />
            </Form.Item>
            </Col>
            <Col span={3} >
              <Row style={{width:"100%"}} justify="end">
                <Button htmlType="submit" style={{padding: '10px 50px', height:50, borderRadius:4, backgroundColor:"#ffe58f", color:"#003a8c", fontWeight:600}} >
                  Tìm
                </Button>
              </Row>
            </Col>
            </Form>
          </Row>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{padding: '10px 50px',marginTop:130, maxWidth:1400, width:"100%"}}>
          
          <Row gutter={16}>
            <Col span={6}>
              <List
                size="small"
                header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Địa điểm HOT trong nước</h4>}
                bordered
                dataSource={[
                  { name: "Tất cả" },
                  ...locationList.data,
                ]}
                renderItem={(item) => 
                  (
                  <List.Item
                    onClick={() => handleFilterLocaiton(item.id)}
                    // style={{color: locationSelected === item.id ? 'red': 'black' }}
                    className ="list"
                  >
                    {item.name}
                  </List.Item>
                )}
              />

              <List
                size="small"
                header={<h4 style={{fontSize:18, color:"#333", borderColor: "#ddd"}}>Tours theo chủ đề</h4>}
                bordered
                style={{marginTop:20}}
                dataSource={topicTourList.data}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => handleFilterTopic(item.id)}
                    // style={{ color: locationSelected === item.id ? 'red': 'black'}}
                    className="list"
                  >
                    {item.name}
                  </List.Item>
                )}
              />

              
            </Col>
            <Col span={18} style={{marginTop:16}}>
              {filterTourList.length != 0 && keySearchLocation && <Row style={{fontSize:28, fontWeight:600, color:"#69c0ff"}}>Tour du lịch "{keySearchLocation}" {keySearchFrom && `từ ${keySearchFrom}`} </Row>}
              {filterTourList.length != 0 && filterLocationById.length !== 0 && <Row style={{fontSize:28, fontWeight:600, color:"#69c0ff"}}>Tour du lịch "{filterLocationById[0].name}" {keySearchFrom && `từ ${keySearchFrom}`}</Row>}
              {filterTourList.length != 0 && filterTopicById.length !== 0 && <Row style={{fontSize:28, fontWeight:600, color:"#69c0ff"}}>Tour du lịch "{filterTopicById[0].name}"  {keySearchFrom && `từ ${keySearchFrom}`}</Row>}
              {filterTourList.length == 0 && (<Row>Xin lỗi, chúng tôi không tìm thấy dữ liệu bạn cần.
Xin vui lòng tìm kiếm với từ khóa khác hoặc liên hệ hotline (028) 3933 8002 để được hỗ trợ</Row>)}
              {
                filterTourList.load ? (<p>Loading...</p>) 
                :(filterTourList.map((item, index) => {
                  return (
                    <ItemTour
                      key={index}
                      title={item.name}
                      link={item.linkList}
                      description={item.description}
                      price={item.price}
                      time={item.time}
                      rate={item.rate}
                      startDate={item.dateStart}
                      date={dateBookingSelected}
                      id={item.id}
                    />
                  )
                }))
              }
            </Col>

          </Row>
        </div>
      </div>
      </>
    )
  }

  return (
    <div>
      {renderTourList()}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { tourList, topicTourList } = state.tourReducer;
  const { locationList } = state.hotelReducer;
  return {
    tourList: tourList,
    locationList: locationList,
    topicTourList: topicTourList

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourList: (params) => dispatch(getTourListAction(params)),
    getLocationList: (params) => dispatch(getLocationListAction(params)),
    getTopicTourList: (params) => dispatch(getTopicTourListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TourListPage);
  
  