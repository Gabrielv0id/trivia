import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Ranking extends Component {
  redirect = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    // const { prop1, dispatch } = this.props;
    const rankedPeople = JSON.parse(localStorage.getItem('rankedPeople')) || [];

    // localStorage.setItem('rankedPeople', JSON.stringify(rankedPeople));

    return (
      <div>
        <h3 data-testid="ranking-title">
          Ranking
        </h3>
        {rankedPeople.map((ranked, index) => (
          <div key={ index }>
            <img
              data-testid="header-profile-picture"
              src={ ranked.imageProfile }
              alt="profile"
            />
            <h6 data-testid={ `player-name-${index}` }>{ ranked.name }</h6>
            <h6 data-testid={ `player-score-${index}` }>{ ranked.score }</h6>
          </div>))}
        <button type="button" data-testid="btn-go-home" onClick={ this.redirect }>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(Ranking);
