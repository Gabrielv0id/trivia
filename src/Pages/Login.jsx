// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Login extends Component {
  state = {
    isButtonInvalid: true,
    email: '',
    name: '',
  };

  startGame = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    const { token } = json;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  validateButton = () => {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        isButtonInvalid: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateButton();
  };

  render() {
    const { name, email, isButtonInvalid } = this.state;
    return (
      <div>
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          // onClick={ startGame }
          data-testid="btn-play"
          disabled={ isButtonInvalid }
          onClick={ this.startGame }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
