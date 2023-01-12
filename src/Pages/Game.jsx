import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import questionsAPI from '../API/questionsAPI';
import Header from '../Components/Header';
import Timer from '../Components/Timer';
import shuffle from '../util/shuffle';

class Game extends Component {
  state = {
    currentQuestion: 0,
    questions: [],
    hasAwnsered: false,
    category: '',
    difficulty: '',
    text: '',
    correctAnswer: '',
    incorrectAnswers: [],
    correctAwnser: '',
    incorrectAwnser: [],
    // This property is managed by 'Timer' child component
    timerHandle: {
      timerFinished: false,
      timerValueWhenFinished: 0,
      startTimer: () => {},
    },
  };

  componentDidMount() {
    const { timerHandle: { startTimer } } = this.state;
    const token = localStorage.getItem('token');
    this.getQuestions(token);
    startTimer();
  }

  setQuestions = () => {
    const { questions, currentQuestion } = this.state;
    const { category, difficulty, question } = questions[currentQuestion];
    const correctAwnser = results.correct_awnser;
    const incorrectAwnser = results.incorrect_answers;

    this.setState({
      category,
      difficulty,
      text: question,
      shuffledAwnsers: shuffle([results.correct_awnser, ...results.incorrectAwnser]),
      correctAwnser,
      incorrectAwnser,
    });
  };

  getQuestions = async (token) => {
    const { history } = this.props;
    const response = await questionsAPI(token);

    // If response_code is invalid, return to initial page
    if (!response) history.push('/');

    this.setState({
      questions: response.results,
    }, this.setQuestions);
  };

  render() {
    const { hasAwnsered,
      category, difficulty, text, correctAwnser, incorrectAwnser, shuffledAwnsers } = this.state;
    // const { prop1, dispatch } = this.props;
    return (
      <div>
        <Header />

        <p data-testid="question-category">
          Category:
          {category}
        </p>

        <p data-testid="question-text">{questions[currentQuestion].question}</p>

        <div data-testid="answer-options">
          <button type="button" data-testid="correct-answer">
            {correctAnswer}
          </button>

          {incorrectAnswers.map(
            (answer) => <button key={ answer } type="button">{answer}</button>,
          )}
        </div>

        <Timer parentSetState={ this.setState } />
        <div id="game-questions">
          <h2 data-testid="question-category"></h2>
          <h2 data-testid="question-text"></h2>
          {
            shuffledAwnsers.map(() => {
              
            })
          }
        </div>
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
