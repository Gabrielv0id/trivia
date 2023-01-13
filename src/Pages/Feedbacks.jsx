import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedbacks extends Component {
  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/Ranking');
  };

  render() {
    const { player } = this.props;
    const { score, assertions } = player;
    const value = 3;

    return (
      <div data-testid="feedback-text">
        <Header />
        <h2 data-testid="feedback-total-score">
          {score}
        </h2>
        <h3 data-testid="feedback-total-question">
          {assertions}
        </h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToLogin }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
        {
          (assertions < value) ? <span>Could be better...</span> : <span>Well Done!</span>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
