import { Form, Input, Button, Rate, Comment, Tooltip, Avatar } from "antd";
import { useEffect, createElement, useState } from "react";
import { connect } from "react-redux";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import "./style.css";
import { getCommentAction, addCommentAction } from "../../redux/actions";
import moment from "moment";

function CommentPage(props) {
  const { commentList, addComment, getCommentList, hotelId, tourId, userInfo } =
    props;
  const [form] = Form.useForm();

  useEffect(() => {
    // hotelId ?
    getCommentList({
      page: 1,
      limit: 4,
      hotelId: parseInt(hotelId),
      tourId: parseInt(tourId),
    });
    // }) :
    // getCommentList({
    //   page: 1,
    //   limit: 4,
    //   tourId: parseInt(tourId)
    // })
  }, []);

  function handleAddComment(values) {
    if (!userInfo.data.id) {
      alert("Bạn cần đăng nhập!");
    } else {
      // hotelId ?
      addComment({
        ...values,
        userName: userInfo.data.name,
        hotelId: parseInt(hotelId),
        tourId: parseInt(tourId),
        userId: userInfo.data.id,
      });
      // :
      // addComment({...values, tourId: parseInt(tourId), userId: userInfo.id, useName: userInfo.name });
      form.resetFields();
    }
  }
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  // const like = () => {
  //   setLikes(1);
  //   setDislikes(0);
  //   setAction('liked');
  // };

  // const dislike = () => {
  //   setLikes(0);
  //   setDislikes(1);
  //   setAction('disliked');
  // };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      {/* <span onClick={like}> */}
      <span>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      {/* <span onClick={dislike}> */}
      <span>
        {createElement(action === "disliked" ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    // <span key="comment-basic-reply-to">Reply to</span>,
  ];
  function renderComment() {
    return commentList.data.map((item, index) => {
      return (
        <div style={{ width: "auto" }}>
          <div class="horizontalLine"></div>
          <Comment
            actions={actions}
            author={<a>{item.userName}</a>}
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <>
                <Rate disabled value={item.rate} />
                <p>{item.comment}</p>
              </>
            }
            datetime={
              <>
                <span>Bình luận ngày </span>
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span>{item.creatDate}</span>
                </Tooltip>
              </>
            }
          />
        </div>
      );
    });
  }

  return (
    <>
      {userInfo.data.id && (
        <Form
          layout="vertical"
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={(values) => handleAddComment(values)}
          style={{ backgroundColor: '#f5f5f5', padding: 16 }}
        >
          <h3 style={{ marginTop: 0 }}>Viết nhận xét & đánh giá</h3>
          <Form.Item
            label="Chọn điểm"
            name="rate"
            rules={[{ required: true, message: "vui lòng nhập!" }]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="comment"
            placeholder="Nhập vào đây"
            rules={[{ required: true, message: "vui lòng nhập!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Đánh giá
          </Button>
        </Form>
      )}
      <h3>Nhận xét & đánh giá gần đây</h3>
      {renderComment()}
    </>
  );
}
const mapStateToProps = (state) => {
  const { commentList } = state.commentReducer;
  const { userInfo } = state.userReducer;
  return {
    commentList: commentList,
    userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (params) => dispatch(addCommentAction(params)),
    getCommentList: (params) => dispatch(getCommentAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);
