import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedbacks extends Component {
  render() {
    const { player } = this.props;
    const { score, assertions } = player;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h2 data-testid="feedback-total-score">
          {score}
        </h2>
        <h3 data-testid="feedback-total-question">
          {assertions}
        </h3>
        {
          (assertions < 3) ? <span>Could be better...</span> : <span>Well Done!</span>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Feedbacks.propTypes = {
  player: PropTypes.shape({
    gravatarEmail: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
