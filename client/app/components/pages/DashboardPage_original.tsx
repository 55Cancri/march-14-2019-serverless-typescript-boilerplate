import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

interface IProps {}

interface IState {
  direction: number;
}

const Div = posed.div({
  // delay the animation slightly so the enter and exits do not overlap
  enter: { x: 0, opacity: 1, delay: 100 },
  exit: {
    x: -4000,
    opacity: 0,
    transition: {
      type: 'decay',
      // duration: 1000
    },
  },
  // exit: { x: ({ direction }) => direction * 100, opacity: 0 },
});

class DashboardPage extends Component<IProps, IState> {
  state = { direction: -1 };

  render = () => {
    const { direction } = this.state;
    return (
      <PoseGroup>
        <Div
          flipMove={false}
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
            border: '5px solid yellow',
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
