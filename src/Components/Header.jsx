import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { MD5 } from 'crypto-js';

function Header(props) {
  console.log(props);
  const { player } = props;
  const { gravatarEmail, score, name } = player;

  const constructGravatarUrl = () => {
    const baseUrl = 'https://www.gravatar.com/avatar/';
    const hashedEmail = MD5(gravatarEmail).toString();
    return `${baseUrl}${hashedEmail}`;
  };

  const savedImgLocalStoraage = () => {
    const img = constructGravatarUrl();
    localStorage.setItem('imageProfile', img);
  };

  savedImgLocalStoraage();

  return (
    <div>
      <img
        data-testid="header-profile-picture"
        src={ constructGravatarUrl() }
        alt="profile"
      />
      <h6 data-testid="header-score">{ score }</h6>
      <h6 data-testid="header-player-name">{ name }</h6>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

Header.propTypes = {
  player: PropTypes.shape({
    gravatarEmail: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Header);
