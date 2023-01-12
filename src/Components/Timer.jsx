import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  state = {
    timer: 30,
    timerId: 0,
  };

  componentDidMount() {
    const { setTimerStartAndStop } = this.props;
    setTimerStartAndStop(this.startTimer, this.stopTimer);
  }

  stopTimer = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
  };

  triggerFinishedTimer = () => {
    const { timer } = this.state;
    const { setTimerHandleState, triggerAnswer } = this.props;

    const HAS_TIMER_FINISHED = true;
    this.stopTimer();
    setTimerHandleState(HAS_TIMER_FINISHED, timer);
    triggerAnswer();
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
    const { setTimerHandleState } = this.props;
    this.setState({
      timer: 30,
    });
    const HAS_TIMER_FINISHED = false;
    const THIRTY_SECONDS = 30;
    setTimerHandleState(HAS_TIMER_FINISHED, THIRTY_SECONDS);
  };

  startTimer = () => {
    const THREE_SECONDS = 1000;
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
  setTimerHandleState: PropTypes.func.isRequired,
  triggerAnswer: PropTypes.func.isRequired,
  setTimerStartAndStop: PropTypes.func.isRequired,
};

export default Timer;
