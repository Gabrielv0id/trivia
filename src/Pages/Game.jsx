// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import questionsAPI from '../API/questionsAPI';
import Header from '../Components/Header';
import Timer from '../Components/Timer';

class Game extends Component {
  state = {
    currentQuestion: 0,
    questions: [],
    awnsered: false,
    category: '',
    difficulty: '',
    text: '',
    correctAwnser: '',
    incorrectAwnser: [],
    // This property is managed by 'Timer' child component
    timerHandle: {
      timerFinished: false,
      startTimer: () => {},
    },
  };

  componentDidMount() {
    const { timerHandle: { startTimer } } = this.state;
    const token = localStorage.getItem('token');
    const response = this.setQuestions();
    startTimer();
  }

  setQuestions = async () => {
    const { history } = this.props;
    const response = await questionsAPI();

    // If response_code is invalid, return to initial page
    if (!response) history.push('/');

    const { category, difficulty, question } = results;
    const correctAwnser = results.correct_awnser;
    const incorrectAwnser = results.incorrect_answers;

    this.setState({
      category,
      difficulty,
      text: question,
      questions: [results.correct_awnser, ...results.incorrectAwnser],
      correctAwnser,
      incorrectAwnser,
    });
  };

  render() {
    const { currentQuestion, questions, awnsered,
      category, difficulty, text, correctAwnser, incorrectAwnser } = this.state;
    // const { prop1, dispatch } = this.props;
    return (
      <div>
        <Header />
        <Timer parentSetState={ this.setState } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Game.propTypes = {
  // prop1: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Game);
