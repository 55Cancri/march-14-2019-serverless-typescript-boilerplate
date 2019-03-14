import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

interface IProps {}

interface IState {
  direction: number;
}

const Div = posed.div({
  // delay the animation slightly so the enter and exits do not overlap
  // enter: { x: 0 },
  // exit: { x: -1000 },
  // exit: { x: ({ direction }) => direction * 100, opacity: 0 },
});

class FinalPage extends Component<IProps, IState> {
  state = { direction: -1 };

  render = () => {
    const { direction } = this.state;
    return (
      <PoseGroup flipMove={false}>
        <Div
          key="final"
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
          <div className="square" style={{ height: 100, width: 100, backgroundColor: 'red' }} />
          <p>Final page.</p>
        </Div>
      </PoseGroup>
    );
  };
}
export default FinalPage;
