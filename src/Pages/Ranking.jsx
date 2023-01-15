import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { resetScoreAction } from '../redux/actions';

class Ranking extends Component {
  redirect = () => {
    const { history } = this.props;
    history.push('/');
  };

  saveAndOrderRankedPeople = (param) => {
    const magicNumber = -1;
    return param.sort((a, b) => {
      if (a.score > b.score) {
        return magicNumber;
      } return true;
    });
  };

  resetScore = () => {
    const { dispatch } = this.props;
    dispatch(resetScoreAction());
  };

  render() {
    // const { prop1, dispatch } = this.props;
    const rankedPeople = JSON.parse(localStorage.getItem('rankedPeople'));
    const rankedAtualized = this.saveAndOrderRankedPeople(rankedPeople);
    localStorage.setItem('rankedPeople', JSON.stringify(rankedAtualized));

    return (
      <div>
        <h3 data-testid="ranking-title">
          Ranking
        </h3>
        {rankedAtualized.map((ranked, index) => (
          <div key={ index }>
            <img
              data-testid="header-profile-picture"
              src={ ranked.imageProfile }
              alt="profile"
            />
            <h6 data-testid={ `player-name-${ranked.number}` }>{ ranked.name }</h6>
            <h6 data-testid={ `player-score-${ranked.number}` }>{ ranked.score }</h6>
          </div>))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            this.redirect();
            this.resetScore();
          } }
        >
          Go Home!
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Ranking.propTypes = {
  // prop1: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(Ranking);
