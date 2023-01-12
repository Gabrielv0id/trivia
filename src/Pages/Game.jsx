import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import questionsAPI from '../API/questionsAPI';
import Header from '../Components/Header';
import Timer from '../Components/Timer';

class Game extends Component {
  state = {
    currentQuestion: 0,
    questions: [{
      question: 'ei hey',
    }],
    answered: false,
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
    const response = this.setQuestions();
    startTimer();
  }

  setQuestions = () => {
    const { questions, currentQuestion } = this.state;
    const { category, difficulty, question } = questions[currentQuestion];
    const correctAnswer = questions[currentQuestion].correct_answer;
    const incorrectAnswers = questions[currentQuestion].incorrect_answers;

    this.setState({
      category,
      difficulty,
      text: question,
      correctAnswer,
      incorrectAnswers,
    });
  };

  getQuestions = async (param) => {
    const { history } = this.props;
    const response = await questionsAPI(param);

    // If response_code is invalid, return to initial page
    if (!response) {
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState({
      questions: response,
    }, this.setQuestions);
  };

  render() {
    const { currentQuestion, questions, answered,
      category, difficulty, text, correctAnswer, incorrectAnswers } = this.state;
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
