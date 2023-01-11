// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

function Login() {
  // const { prop1, dispatch } = props;
  return (
    <div>content</div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

// Login.propTypes = {
//   prop1: PropTypes.string.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };
export default connect(mapStateToProps)(Login);
