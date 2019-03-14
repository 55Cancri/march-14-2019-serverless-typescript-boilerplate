import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

interface IProps {}

interface IState {
  direction: number;
}

const Div = posed.div({
  // delay the animation slightly so the enter and exits do not overlap
  // exit: { x: ({ direction }) => direction * 100, opacity: 0 },
});

// const Shape = posed.div({
// enter: { x: 0, delay: 300 },
// exit: { x: 1000, transition: { duration: 300 } },
// });

class DashboardPage extends Component<IProps, IState> {
  state = { direction: -1 };

  render = () => {
    const { direction } = this.state;
    return (
      <PoseGroup flipMove={false}>
        <Div
          key="dashboard"
          // initialPose="exit"
          // pose="enter"
          direction={direction}
          style={{
            display: 'grid',
            width: '100%',
            height: '80vh',
            gridAutoRows: 'max-content',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          <div
            className="triangle"
            style={{
              borderColor: 'orange transparent',
              borderStyle: 'solid',
              borderWidth: '0px 60px 100px 60px',
              height: 0,
              width: 0,
            }}
          />
          <p>First page.</p>
        </Div>
      </PoseGroup>
    );
  };
}
export default DashboardPage;
