import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

interface IProps {}

interface IState {
  direction: number;
}

const Div = posed.div({
  // delay the animation slightly so the enter and exits do not overlap
  // enter: { opacity: 1, transition: { duration: 3000 } },
  // exit: { opacity: 0, transition: { duration: 3000 } },
  // exit: { x: ({ direction }) => direction * 100, opacity: 0 },
});

const Shape = posed.div({
  // enter: { x: 0, delay: 300 },
  // exit: { x: 1000, transition: { duration: 300 } },
});

class NextPage extends Component<IProps, IState> {
  state = { direction: -1 };

  render = () => {
    const { direction } = this.state;
    return (
      <PoseGroup flipMove={false}>
        <Div
          key="next"
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
          <Shape
            className="circle"
            style={{ height: 100, width: 100, borderRadius: '50%', backgroundColor: 'green' }}
          />
          <p>next page.</p>
        </Div>
      </PoseGroup>
    );
  };
}
export default NextPage;
