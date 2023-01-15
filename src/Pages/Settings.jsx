import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/settings.css';
import { connect } from 'react-redux';
import { setUrl } from '../redux/actions';

class Settings extends Component {
  state = {
    triviaAmount: '5',
    triviaCategory: 'any',
    triviaDifficulty: 'any',
    triviaType: 'any',
    triviaEncoding: 'default',
  };

  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveSettings = () => {
    const { triviaAmount, triviaCategory, triviaDifficulty,
      triviaType, triviaEncoding } = this.state;
    const { dispatch } = this.props;
    let url = `https://opentdb.com/api.php?amount=${triviaAmount}`;
    if (triviaCategory !== 'any') url += `&category=${triviaCategory}`;
    if (triviaDifficulty !== 'any') url += `&difficulty=${triviaDifficulty}`;
    if (triviaType !== 'any') url += `&type=${triviaType}`;
    if (triviaEncoding !== 'default') url += `&encode=${triviaEncoding}`;
    dispatch(setUrl(url));
  };

  render() {
    const { triviaAmount, triviaCategory, triviaDifficulty,
      triviaType, triviaEncoding } = this.state;
    return (
      <div>
        <div>
          <h1 data-testid="settings-title">Settings</h1>
        </div>
        <div className="settings-form">
          <label htmlFor="trivia_amount">
            Number of questions:
            <input
              type="number"
              name="triviaAmount"
              id="trivia_amount"
              className="form-control"
              min="1"
              max="50"
              value={ triviaAmount }
              onChange={ (e) => { this.handleChange(e); } }
            />
          </label>
          <label htmlFor="category-select">
            Select category:
            <select
              id="category-select"
              name="triviaCategory"
              value={ triviaCategory }
              onChange={ (e) => { this.handleChange(e); } }
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>
          <label htmlFor="difficulty-select">
            Select difficulty:
            <select
              id="difficulty-select"
              name="triviaDifficulty"
              value={ triviaDifficulty }
              onChange={ (e) => { this.handleChange(e); } }
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type-select">
            Select type:
            <select
              id="type-select"
              name="triviaType"
              value={ triviaType }
              onChange={ (e) => { this.handleChange(e); } }
            >
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
          <label htmlFor="encoding-select">
            Select encoding:
            <select
              id="encoding-select"
              name="triviaEncoding"
              value={ triviaEncoding }
              onChange={ (e) => { this.handleChange(e); } }
            >
              <option value="default">Default Encoding</option>
              <option value="urlLegacy">Legacy URL Encoding</option>
              <option value="url3986">URL Encoding (RFC 3986)</option>
              <option value="base64">Base64 Encoding</option>
            </select>
          </label>
          <button
            id="save-configs"
            type="button"
            onClick={ this.saveSettings }
          >
            Save settings
          </button>
          <button
            id="home-button"
            type="button"
            onClick={ this.redirectToLogin }
          >
            Retornar
          </button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Settings);
