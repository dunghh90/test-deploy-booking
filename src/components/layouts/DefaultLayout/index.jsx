import { Footer } from 'antd/lib/layout/layout';
import { Route } from 'react-router-dom';
import Header from '../Header';
import FooterPage from '../Footer'

function DefaultLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps} />
            <Component {...other} {...routeProps} />
            <FooterPage />
          </>
        )
      }}
    />
  );
}

export default DefaultLayout;