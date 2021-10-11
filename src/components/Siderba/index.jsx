import { Row, Col, List, Space } from "antd";
// import {List } from '@ant-design/icons';
import "./Siderba.css";
import { getListHotelAction } from "../../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Rate } from "antd";

const RATING_LIST = [5, 4, 3, 2, 1];

function Siderba({
  handleFilterLocation,
  handleFilterRate,
  locationList,
  locationSelected,
  rateSelected
}) {
  return (
    <>
      <List
        size="small"
        header={<div>Tìm kiếm theo địa điểm</div>}
        bordered
        dataSource={[
          {
            name: 'Tất cả',
          },
          ...locationList.data
        ]}
        renderItem={(item) => (
          <List.Item
            className={item.id === locationSelected ? "list active" : "list"}
            onClick={() => handleFilterLocation(item.id)}
            // style={{ color: locationSelected === item ? 'red' : 'black' }}
          >
            {item.name}
          </List.Item>
        )}
      />
      <List
        size="small"
        header={<div>Tìm kiếm theo chất lượng</div>}
        bordered
        dataSource={RATING_LIST}
        renderItem={(item) => (
          <List.Item
            className={item === rateSelected ? "list active" : "list"}
            onClick={() => handleFilterRate(item)}
            // style={{ color: locationSelected === item ? 'red' : 'black' }}
          >
            <Space size={16}>
              <Rate disabled defaultValue={item} />
              <div>{item} sao</div>
            </Space>
          </List.Item>
        )}
      />
    </>
  );
}
const mapStateToProps = (state) => {
  const { listHotel } = state.hotelReducer;
  return {
    listHotel: listHotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelList: (params) => dispatch(getListHotelAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Siderba);
