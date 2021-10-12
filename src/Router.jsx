import { Router, Switch } from 'react-router-dom';
// utils
import history from './utils/history';
import { ROUTERS } from './constants/router';
// components
// import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';

import TourListPage from './pages/TourList';
import LoginPage from './pages/Login';
import TourHomePage from './pages/TourHome';
import HomePage from './pages/HotelHome';
import ListHotelPage from './pages/HotelList';
import ListRoomPage from './pages/HotelDetail';
import reViewPage from './components/Review';
import TourDetailPage from "./pages/TourDetail";
import ProfilePage from "./pages/Profile"

function BrowserRouter(props) {
  const { productList } = props;
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout
          exact
          path={ROUTERS.LOGIN}
          component={LoginPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.PROFILE}
          component={ProfilePage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.TOUR_HOME}
          component={TourHomePage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.TOUR_LIST}
          component={TourListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.TOUR_DETAIL}
          component={TourDetailPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.TOUR_SEARCH}
          component={TourListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.HOTEL_HOME}
          component={HomePage}
          productList={productList}
        />
        <DefaultLayout
          exact
          path={ROUTERS.HOTEL_LIST}
          component={ListHotelPage}
          productList={productList}
        />
        <DefaultLayout
          exact
          path={ROUTERS.HOTEL_DETAIL}
          component={ListRoomPage}
          productList={productList}
        />
        <DefaultLayout
          exact
          path={ROUTERS.REVIEW}
          component={reViewPage}
          productList={productList}
        />

      </Switch>

    </Router>
  );
}

export default BrowserRouter;