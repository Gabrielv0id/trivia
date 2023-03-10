import { EXEMPLO_ACTION, SET_NAME_AND_EMAIL, SET_NEW_SCORE,
  SET_TIME_WHEN_FINISHED, SET_ASSERTIONS, RESET_SCORE, SET_URL } from './actions';

const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 0,
  score: 0,
  gravatarEmail: 'email-da-pessoa',
  timeWhenTimerFinished: 30,
  URL: 'https://opentdb.com/api.php?amount=5&token=',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXEMPLO_ACTION:
    return { ...state };
  case SET_NAME_AND_EMAIL:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SET_NEW_SCORE:
    return {
      ...state,
      score: action.payload.score,
    };
  case SET_TIME_WHEN_FINISHED:
    return {
      ...state,
      timeWhenTimerFinished: action.payload,
    };
  case SET_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload.assertions,
    };
  case RESET_SCORE:
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
      timeWhenTimerFinished: action.payload.timeWhenTimerFinished,
    };
  case SET_URL:
    return {
      ...state,
      URL: action.payload.url,
    };
  default:
    return { ...state };
  }
};

export default playerReducer;
