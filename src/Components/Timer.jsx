import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  state = {
    timer: 30,
    timerId: 0,
  };

  componentDidMount() {
    const { manageParentComponent } = this.props;
    const FIRST_TIME = true;
    const TIMER_FINISHED = false;
    manageParentComponent(
      FIRST_TIME,
      TIMER_FINISHED,
      this.startTimer,
      this.triggerFinishedTimer,
    );
  }

  stopTimer = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
  };

  triggerFinishedTimer = () => {
    const { manageParentComponent } = this.props;
    this.stopTimer();
    const FIRST_TIME = false;
    const TIMER_FINISHED = true;
    manageParentComponent(FIRST_TIME, TIMER_FINISHED);
  };

  decreaseTimer = () => {
    const { timer } = this.state;

    const TIMER_FINISHED = 0;
    if (timer === TIMER_FINISHED) {
      this.triggerFinishedTimer();
      return;
    }

    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }));
  };

  setTimerInitialState = () => {
    const { manageParentComponent } = this.props;
    this.setState({
      timer: 30,
    });
    const FIRST_TIME = false;
    const TIMER_FINISHED = false;
    manageParentComponent(FIRST_TIME, TIMER_FINISHED);
  };

  startTimer = () => {
    const THREE_SECONDS = 3000;
    const ONE_SECOND = 1000;
    this.setTimerInitialState();

    // Set small delay before starting timer
    setTimeout(() => {
      const timerId = setInterval(this.decreaseTimer, ONE_SECOND);
      this.setState({ timerId });
    }, THREE_SECONDS);
  };

  render() {
    const { timer } = this.state;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

Timer.propTypes = {
  manageParentComponent: PropTypes.func.isRequired,
};

export default Timer;
