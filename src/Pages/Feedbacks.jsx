import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { resetScoreAction } from '../redux/actions';

let number = 0;

class Feedbacks extends Component {
  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/Ranking');
  };

  rankingSave = () => {
    const imageProfile = localStorage.getItem('imageProfile');
    const { player } = this.props;
    const { score, name } = player;
    const getItem = localStorage.getItem('rankedPeople');

    const ranked = {
      name,
      score,
      imageProfile,
    };

    if (getItem !== null) {
      number += 1;
      ranked.number = number;
      const rankedPeople = JSON.parse(localStorage.getItem('rankedPeople'));
      rankedPeople.push(ranked);
      localStorage.setItem('rankedPeople', JSON.stringify(rankedPeople));

      rankedPeople.sort((a, b) => b.score - a.score);
      ranked.number = number;
      localStorage.setItem('rankedPeople', JSON.stringify(rankedPeople));
    } else {
      localStorage.setItem('rankedPeople', JSON.stringify([ranked]));
    }
  };

  resetScore = () => {
    const { dispatch } = this.props;
    dispatch(resetScoreAction());
  };

  render() {
    const { player } = this.props;
    const { score, assertions } = player;
    const value = 3;

    this.rankingSave();

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
          onClick={ () => {
            this.redirect('button_playAgain');
            this.resetScore();
          } }
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
  dispatch: PropTypes.func.isRequired,
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
