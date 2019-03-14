import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as H from 'history';

interface RouteProps {
  location?: H.Location;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteComponentProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string;
  exact?: boolean;
  strict?: boolean;
}

interface StateProps {
  isAuthenticated?: boolean;
}

interface DispatchProps {
  startLogout?: () => void;
}

type Props = StateProps & DispatchProps & RouteProps;

// get component from browser router
export const PublicRoute: React.SFC<Props> = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      (!isAuthenticated ? (
        <div id="main-content">
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/dashboard" />
      ))
    }
  />
);

const mapStateToProps = state => ({ isAuthenticated: !!state.auth.token });

export default connect<StateProps, DispatchProps, RouteProps>(mapStateToProps)(PublicRoute);
