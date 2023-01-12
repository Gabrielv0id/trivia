import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import questionsAPI from '../API/questionsAPI';
import Header from '../Components/Header';
import Timer from '../Components/Timer';
import '../style/answersColors.style.css';
import shuffle from '../util/shuffle';
import { setNewScore } from '../redux/actions';

class Game extends Component {
  state = {
    currentQuestion: 0,
    questions: [],
    hasAnswered: false,
    category: '',
    difficulty: '',
    text: '',
    correctAnswer: '',
    incorrectAnswers: [],
    shuffledAnswers: [],

    // This property is managed by 'Timer' child component
    timerHandle: {
      timerFinished: false,
      timerValueWhenFinished: 0,
      startTimer: () => {},
      stopTimer: () => {},
    },
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.getQuestions(token);
  }
  
  setQuestions = () => {
    const { questions, currentQuestion, timerHandle } = this.state;
    const { category, difficulty, question } = questions[currentQuestion];
    const correctAnswer = questions[currentQuestion].correct_answer;
    const incorrectAnswers = questions[currentQuestion].incorrect_answers;

    this.setState({
      category,
      difficulty,
      text: question,
      shuffledAnswers: shuffle([correctAnswer, ...incorrectAnswers]),
      correctAnswer,
      incorrectAnswers,
    });
    timerHandle.startTimer();
  };

  getQuestions = async (token) => {
    const { history } = this.props;
    const response = await questionsAPI(token);

    // If response_code is invalid, return to initial page
    if (!response) history.push('/');

    this.setState({
      questions: response,
    }, this.setQuestions);
  };

  updateScore = ({ target }) => {
    const { player: { score }, dispatch } = this.props;
    const { timerHandle: { timerValueWhenFinished }, difficulty } = this.state;
    const buttonTestId = target.getAttribute('data-testid');
    let difficultySum;
    switch(difficulty) {
      case 'easy':
        difficultySum = 1;
      break;
      case 'medium':
        difficultySum = 2;
      break;
      case 'hard':
        difficultySum = 3;
      break;
    }
    if (buttonTestId.match(/correct-answer/)) {
      const newScore = score + 10 + (timerValueWhenFinished * difficultySum);
      console.log(newScore);
      dispatch(setNewScore(newScore));
    }
  }

  triggerAnswer = () => {
    const { timerHandle } = this.state;
    timerHandle.stopTimer();
    this.setState({ hasAnswered: true });
  };

  setTimerStartAndStop = (startTimer, stopTimer) => {
    this.setState((prevState) => ({
      timerHandle: {
        ...prevState.timerHandle,
        startTimer,
        stopTimer,
      },
    }));
  };

  setTimerHandleState = (timerFinishedState, currentTime = 0) => {
    this.setState((prevState) => (
      {
        timerHandle: {
          ...prevState.timerHandle,
          timerFinished: timerFinishedState,
          timerValueWhenFinished: currentTime,
        },
      }
    ));
  };

  renderShuffledAnswer = () => {
    const { correctAnswer, shuffledAnswers, hasAnswered } = this.state;

    let currentWrongIndex = 0;
    return shuffledAnswers.map((answer) => {
      let dataTestId;
      let eleClass;
      if (answer !== correctAnswer) {
        dataTestId = `wrong-answer-${currentWrongIndex}`;
        eleClass = 'wrong';
        currentWrongIndex += 1;
      } else {
        dataTestId = 'correct-answer';
        eleClass = 'correct';
      }
      return (
        <button
          key={ dataTestId }
          type="button"
          className={ hasAnswered ? eleClass : '' }
          data-testid={ dataTestId }
          onClick={ (e) => { 
            this.triggerAnswer()
            this.updateScore(e) 
          } }
          disabled={ hasAnswered }
        >
          { answer }
        </button>
      );
    });
  };

  render() {
    const { timerHandle,
      hasAnswered, category, text, difficulty, incorrectAnswers } = this.state;
    const { timerFinished } = timerHandle;
    if (timerFinished) this.triggerAnswer();
    // const { prop1, dispatch } = this.props;
    console.log(hasAnswered, difficulty, incorrectAnswers);
    return (
      <div>
        <Header />
        <Timer
          setTimerHandleState={ this.setTimerHandleState }
          setTimerStartAndStop={ this.setTimerStartAndStop }
          triggerAnswer={ this.triggerAnswer }
        />
        <div id="game-questions">
          <h2 data-testid="question-category">{ category }</h2>
          <h2 data-testid="question-text">{ text }</h2>
          <div data-testid="answer-options">
            { this.renderShuffledAnswer() }
          </div>
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
