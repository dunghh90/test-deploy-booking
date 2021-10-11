import { Row, Col, Card, Image, Space } from "antd";

function ItemRoom(props) {
  const { description } = props;

  // const [isEdit, setIsEdit] = useState(false);
  // const [isShowDescription, setIsShowDescription] = useState(false);
  // const [editForm] = Form.useForm();
  const { Meta } = Card;

  function renderItem() {
    return description.map((item, index) => {
      return (
        <li>
          <a style={{ color: "#00C1DE" }}>{item}</a>
        </li>
      );
    });
  }
  return <ul style={{ paddingLeft: 20, marginBottom: 0 }}>{renderItem()}</ul>;
}

export default ItemRoom;
