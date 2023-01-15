export const EXEMPLO_ACTION = 'EXEMPLO_ACTION';
export const SET_NAME_AND_EMAIL = 'SET_NAME_AND_EMAIL';
export const SET_NEW_SCORE = 'SET_NEW_SCORE';
export const SET_TIME_WHEN_FINISHED = 'TIME_WHEN_FINISHED';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const RESET_SCORE = 'RESET_SCORE';

export const exempleAction = (parameter) => ({
  type: EXEMPLO_ACTION,
  payload: parameter,
});

export const setNameNadEmailAction = ({ name, email }) => ({
  type: SET_NAME_AND_EMAIL,
  payload: { name, email },
});

export const setNewScore = (newScore) => ({
  type: SET_NEW_SCORE,
  payload: { score: newScore },
});

export const setTimeWhenFinishedAction = (time) => ({
  type: SET_TIME_WHEN_FINISHED,
  payload: time,
});

export const setAssertions = (assertion) => ({
  type: SET_ASSERTIONS,
  payload: { assertions: assertion },
});

export const resetScoreAction = () => ({
  type: RESET_SCORE,
  payload: {
    score: 0, assertions: 0, name: '', gravatarEmail: '', timeWhenTimerFinished: 0 },
});
