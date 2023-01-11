import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  redirect = () => {
    const { history } = this.props;
    history.push('/settings');
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirect }
        >
          Setting
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
