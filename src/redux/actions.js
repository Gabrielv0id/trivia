export const EXEMPLO_ACTION = 'EXEMPLO_ACTION';
export const SET_NAME_AND_EMAIL = 'SET_NAME_AND_EMAIL';
export const SET_NEW_SCORE = 'SET_NEW_SCORE';

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
