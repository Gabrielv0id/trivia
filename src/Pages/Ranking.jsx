// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    // const { prop1, dispatch } = this.props;
    return (
      <div>
        <h3 data-testid="ranking-title">
          Ranking
        </h3>
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
};
export default connect(mapStateToProps)(Ranking);
