import { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from './Router';

import { getUserInfoAction,
        getBookingTourAction,
} from './redux/actions';

function App({getUserInfo, getBookingTour}) {

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.id) {
      getUserInfo({ id: userInfo.id });
    }
    getBookingTour();
  }, []);

  return (
    <div style={{backgroundColor:"#ecf0f5"}} >
      <Router />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    getBookingTour: (params) => dispatch(getBookingTourAction(params))
  };
}

export default connect(null, mapDispatchToProps)(App);
