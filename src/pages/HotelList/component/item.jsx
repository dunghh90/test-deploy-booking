import { useState } from "react";
import { Button, Card, Col, Row } from "antd";

function Thumbnail(props) {
  const { img } = props;

  const [pickture, setPickture] = useState([0]);

  function renderThumbnail() {
    return img.map((item, index) => {
      return (
        <>
          <img
            src={item ? item : item.imgs[0]}
            className="card-img-top"
            alt="Card image"
          />
          <div className="card-body">
            <div className="thumbnail-cha">
              <img
                className="thumbnail"
                src={item.imgs[0]}
                width="30%"
                height="auto"
                alt=""
                onClick={() => setPickture(item.imgs[0])}
              />
              <img
                className="thumbnail"
                src={item.imgs[1]}
                width="30%"
                height="auto"
                alt=""
                onClick={() => setPickture(item.imgs[1])}
              />
              <img
                className="thumbnail"
                src={item.imgs[2]}
                width="30%"
                height="auto"
                alt=""
                onClick={() => setPickture(item.imgs[2])}
              />
            </div>
          </div>
        </>
      );
    });
  }
  return <Col>{renderThumbnail()}</Col>;
}
export default Thumbnail;
