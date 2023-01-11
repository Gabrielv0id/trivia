// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Game extends Component {
  state = {
    currentQuestion: 0,
    questions: [],
    awnsered: false,
  };

  render() {
    const { currentQuestion, questions, awnsered } = this.state;
    console.log(currentQuestion, questions, awnsered);
    // const { prop1, dispatch } = this.props;
    return (
      <div>content</div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Game.propTypes = {
  // prop1: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Game);
