// import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Login extends Component {
  state = {
    isButtonInvalid: true,
    email: '',
    name: '',
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
