import { EXEMPLO_ACTION, SET_NAME_AND_EMAIL } from './actions';

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
  case SET_NAME_AND_EMAIL:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  default:
    return { ...state };
  }
};

export default playerReducer;
