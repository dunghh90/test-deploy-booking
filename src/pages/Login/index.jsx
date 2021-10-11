import { Form, Input, Button, Checkbox, Space, Radio, DatePicker } from "antd";
import { connect } from "react-redux";
import {
  FacebookOutlined,
  GooglePlusOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import history from "../../utils/history";
import { loginAction, registerAction } from "../../redux/actions";
import "./styleLogin.css";

import loginBackground from '../../img/login-background.jpg'

import { Tabs } from "antd";

const { TabPane } = Tabs;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 11 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function LoginPage(props) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onCancel = () => {
    history.push("/");
  };

  const { login, register, location } = props;
  const vnf_reg = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  return (
    <>
      <div class="register-bg-container" style={{ backgroundImage: `url(${loginBackground})` }}>
        <div class="register-bg-overlay">
          
          <div className="loginNote">
            <h1 className="noteKS">Booking tour & hotel</h1>
            <p style={{ color: 'white' }}>
              Đem lại cho chúng ta những tiện lợi tiết kiệm được thời gian quý giá
            </p>
            {/* <InstagramOutlined className="iconIns"/>
                <GooglePlusOutlined  twoToneColor="red,blue"  className="iconGG" />
            
                <FacebookOutlined  className="iconFB" /> */}
          </div>

          <div class="register-form-container">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab={<label>Đăng nhập</label>} key="1">
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={(values) => {
                    const newVal = location.state?.prevPath
                      ? { ...values, prevPath: location.state.prevPath }
                      : values;
                    login(newVal);
                  }}
                >
                  <Form.Item
                    label={<label>Email</label>}
                    name="email"
                    rules={[{ required: true, message: "email chưa được nhập!" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={<label>Mật khẩu</label>}
                    name="password"
                    rules={[
                      { required: true, message: "Mật khẩu chưa được nhập!" },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    {...tailLayout}
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Đăng nhập
                      </Button>

                      <Button type="primary" htmlType="button" onClick={onCancel}>
                        Huỷ
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab={<label>Đăng ký tài khoản</label>} key="2">
                <Form
                  {...formItemLayout}
                  // form={form}
                  name="register"
                  onFinish={(values) => register(values)}
                  initialValues={{}}
                  scrollToFirstError
                >
                  <Form.Item
                    name="email"
                    label={<label>Email</label>}
                    rules={[
                      {
                        type: "email",
                        message: "Nhập E-mail không hợp lệ!",
                      },
                      {
                        required: true,
                        message: "E-mail chưa được nhập!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={<label>Mật khẩu</label>}
                    rules={[
                      {
                        required: true,
                        message: "Password chưa được nhập!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label={<label>Xác nhận mật khẩu</label>}
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Xác nhận mật khẩu chưa được nhập!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Nhập confirm password không trùng khớp!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: "Số điện thoại chưa được nhập!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, valuesField) {
                          // debugger
                          // console.log("tessstt " + vnf_reg.test(valuesField))
                          if (!valuesField || vnf_reg.test(parseInt(valuesField)) == true) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(new Error('Số điện thoại không đúng định dạng'));
                          }
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[{ required: true, message: "Chưa chọn giới tính!" }]}
                  >
                    <Radio.Group value={2}>
                      <Radio value="male">Nam</Radio>
                      <Radio value="female">Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    name="birthday"
                    label="Ngày sinh"
                    rules={[
                      { required: true, message: "Ngày sinh chưa được nhập!" },
                    ]}
                  >
                    <DatePicker placeholder="Chọn ngày" />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label={<label>Nickname</label>}
                    tooltip="Có thể nhập tên thường gọi!"
                    rules={[
                      {
                        required: true,
                        message: "Nickname chưa được nhập!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error("Chưa click đồng ý")),
                      },
                    ]}
                    {...tailFormItemLayout}
                  >
                    <Checkbox>
                      Tôi đồng ý tất cả{" "}
                      <a
                        href="#"
                        onClick={() => alert("điều kiện và điều khoản")}
                      >
                        điều kiện & điều khoản
                      </a>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Đăng ký
                      </Button>
                      <Button type="primary" htmlType="button" onClick={onCancel}>
                        Huỷ
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(loginAction(params)),
    register: (params) => dispatch(registerAction(params)),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
