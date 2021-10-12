import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';
import { notification, Modal } from 'antd';
import moment from 'moment';

function* loginSaga(action) {
  try {
    const { email, password, prevPath } = action.payload;
    const result = yield axios({
      method: 'GET',
      // url: 'http://localhost:3002/users',
      url: 'https://json-server-demo-tour.herokuapp.com/api/users',
      params: {
        email,
        password,
      }
    });
    if (result.data.length > 0) {
      localStorage.setItem('userInfo', JSON.stringify(result.data[0]));
      yield put({
        type: "LOGIN_SUCCESS",
        payload: {
          data: result.data[0],
        },
      });
      
      yield history.push(prevPath?prevPath:'/');
    } else {
      yield notification.error({
        message: 'Đăng nhập thất bại',
        description: 'Email hoặc mật khẩu không đúng!',
      });
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: 'Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại',
        },
      });
    }
  } catch (e) {
    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { email, password, name,birthday,gender,phone } = action.payload;
    const emailCheckResult = yield axios({
      method: 'GET',
      // url: 'http://localhost:3002/users',
      url: 'https://json-server-demo-tour.herokuapp.com/api/users',
      params: {
        email,
      }
    });
    if (emailCheckResult.data.length > 0) {
      yield notification.error({
        message: 'Email đăng kí đã tồn tại!',
      });
    } else {
      const result = yield axios({
        method: 'POST',
        // url: 'http://localhost:3002/users',
        url: 'https://json-server-demo-tour.herokuapp.com/api/users',
        data: { email, password, name, birthday: moment(birthday).format("DD/MM/YYYY"), gender, phone }
      });
      yield put({
        type: "REGISTER_SUCCESS",
        payload: {
          data: result.data[0],
        },
      });    
      yield Modal.success({
        content: 'Bạn đã đăng ký thành công',
      });
      history.push('/login')
    }
  } catch(e) {
    yield put({
      type: "REGISTER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    // const result = yield axios.get(`http://localhost:3002/users/${id}`);
    const result = yield axios.get(`https://json-server-demo-tour.herokuapp.com/api/users/${id}`);
    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
function* updateProfileSaga(action) {
  
  try {
    const { id, email, name, birthday, gender, phone, passwordNew, password } = action.payload;
    
    if (passwordNew) {
      
      // const result = yield axios.get(`http://localhost:3002/users?id=${id}&password=${password}`);
      const result = yield axios.get(`https://json-server-demo-tour.herokuapp.com/api/users?id=${id}&password=${password}`);
      
      if (result.data.length === 0) { 
        yield put({
          type: "UPDATE_PROFILE_FAIL",
          payload: {
            error: 'mật khẩu hiện tại không đúng'
          },
        });
        alert("Nhập mật khẩu hiện tại không đúng");

      }  else {
        const result = yield axios({
          method: 'PATCH',
          // url: `http://localhost:3002/users/${id}`,
          url: `https://json-server-demo-tour.herokuapp.com/api/users/${id}`,
          data: { password: passwordNew },
        })   


        yield localStorage.setItem('userInfo', JSON.stringify(result.data));
      
        yield notification.open({
          message: 'cập nhật thông tin thành công',
          // description: `Bạn đã đặt tour ngày`,
        });
        yield put({
          type: "UPDATE_PROFILE_SUCCESS",
          payload: {
            data: result.data,
          },
        });


      } 
    } else {


        const result = yield axios({
            method: 'PATCH',
            // url: `http://localhost:3002/users/${id}`,
            url: `https://json-server-demo-tour.herokuapp.com/api/users/${id}`,
            data: { email, name,birthday,gender,phone},
        });

      
        // const result = passwordNew?
        // yield axios({
        //   method: 'PATCH',
        //   url: `http://localhost:3002/users/${id}`,
        //   data: { password: passwordNew },
        // }) :
        // yield axios({
        //     method: 'PATCH',
        //     url: `http://localhost:3002/users/${id}`,
        //     data: { email, name,birthday,gender,phone},
        // });
      yield localStorage.setItem('userInfo', JSON.stringify(result.data));
      
      yield notification.open({
        message: 'cập nhật thông tin thành công',
      });
      yield put({
        type: "UPDATE_PROFILE_SUCCESS",
        payload: {
          data: result.data,
        },
      });
  }
  } catch(e) {
    yield put({
      type: "UPDATE_PROFILE_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('REGISTER_REQUEST', registerSaga);
  yield takeEvery('GET_USER_INFO_REQUEST', getUserInfoSaga);
  yield takeEvery('UPDATE_PROFILE_REQUEST', updateProfileSaga);
}
