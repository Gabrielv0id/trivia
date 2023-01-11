import { EXEMPLO_ACTION } from './actions';

const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 0,
  score: 0,
  gravatarEmail: 'email-da-pessoa',
};
const playerReducer = (state = INITIAL_STATE, action) => {
  console.log(state, action);
  switch (action.type) {
  case EXEMPLO_ACTION:
    return { ...state };
  default:
    return { ...state };
  }
};

export default playerReducer;
