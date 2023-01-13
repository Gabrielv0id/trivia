import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedbacks extends Component {
  redirect = (param) => {
    const { history } = this.props;
    switch (param) {
    case 'button_playAgain':
      return history.push('/');
    case 'button_Ranking':
      return history.push('/Ranking');
    default:
      return 'error';
    }
  };

  rankingSave = () => {
    const imageProfile = localStorage.getItem('imageProfile');
    const { player } = this.props;
    const { score, name } = player;
    const getItem = localStorage.getItem('rankedPeople');

    const array = [];

    const ranked = {
      name,
      score,
      imageProfile,
    };

    if (getItem !== null) {
      const rankedPeople = JSON.parse(localStorage.getItem('rankedPeople'));
      rankedPeople.push(ranked);
      localStorage.setItem('rankedPeople', JSON.stringify(rankedPeople));
    } else {
      array.push(ranked);
      localStorage.setItem('rankedPeople', JSON.stringify(array));
    }
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
          } }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            this.redirect('button_Ranking');
          } }
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
