import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimeWhenFinishedAction } from '../redux/actions';

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
    const { timer, timerId } = this.state;
    const { dispatch } = this.props;
    clearInterval(timerId);
    dispatch(setTimeWhenFinishedAction(timer));
  };

  triggerFinishedTimer = () => {
    const { triggerAnswer } = this.props;

    this.stopTimer();
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
    this.setState({
      timer: 30,
    });
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
      <div data-testid="timer">
        { timer }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Timer.propTypes = {
  triggerAnswer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  setTimerStartAndStop: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Timer);
