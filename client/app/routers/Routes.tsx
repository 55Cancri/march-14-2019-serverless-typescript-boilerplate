/* eslint-disable import/no-extraneous-dependencies */
// #region package imports
import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

// eslint-disable-next-line import/no-extraneous-dependencies
import createHistory from 'history/createBrowserHistory';
// #endregion package imports
// #region page component imports
import DashboardPage from '@pages/DashboardPage';
import NextPage from '@pages/NextPage';
import FinalPage from '@pages/FinalPage';
import NotFoundPage from '@pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PartialPublicRoute from './PartialPublicRoute';
import FullPublicRoute from './FullPublicRoute';
// #endregion page component imports

// initialize the history object
export const history = createHistory();

interface IProps {
  history?: any;
  sidebarOpen?: any;
}

const RouteContainer = posed.div({
  // it seems the route container needs all the animations
  enter: { delay: 0, x: 0, opacity: 1, transition: { duration: 1000 } },
  exit: { x: -300, opacity: 0, transition: { duration: 1000 } },
  // enter: { opacity: 1, delay: 300, beforeChildren: true },
  // exit: { opacity: 0 },
  // exit: { afterChildren: true },
});

export class Pages extends Component<IProps> {
  state = {};

  render = () => (
    <Router history={history}>
      <Route
        render={({ location }) => (
          <div style={{ position: 'relative' }}>
            <div
              key="nav"
              style={{
                display: 'grid',
                position: 'relative',
                width: '100%',
                gridColumnGap: 15,
                gridTemplateColumns: 'repeat(3, max-content)',
                gridAutoFlow: 'column',
              }}
            >
              <Link key="dashboard-1" to="/dashboard">

                dashboard
              </Link>
              <Link key="next-1" to="/next-page">

                next
              </Link>
              <Link key="final-1" to="/final-page">

                final
              </Link>
            </div>
            {process.env.NODE_DISPLAY === 'full' ? (
              <PoseGroup
                // flipMove={false}
                onRest={() => console.log('onRest: finished all exits')}
              >
                <RouteContainer
                  key={location.pathname}
                  // key={location.pathname.split('/')[1]}
                  // initialPose="exit"
                  // pose="enter"
                  onPoseComplete={pose =>
                    console.log(`✓ [${pose}] all components (onPoseComplete)`)
                  }
                >
                  <Switch location={location}>
                    <FullPublicRoute key="dashboard" path="/dashboard" component={DashboardPage} /> 
                    <FullPublicRoute key="next" path="/next-page" component={NextPage} />
                    <FullPublicRoute key="final" path="/final-page" component={FinalPage} />
                    <Route key="unknown" component={NotFoundPage} />
                  </Switch>
                </RouteContainer>
              </PoseGroup>
            ) : (
              <PoseGroup>
                <RouteContainer key={location.pathname}>
                  <Switch location={location}>
                    <PartialPublicRoute key="dashboard" exact path="/" component={DashboardPage} />
                    <Route key="not-found" component={NotFoundPage} />
                  </Switch>
                </RouteContainer>
              </PoseGroup>
            )}
          </div>
        )}
      />
    </Router>
  );
}

export default Pages;
