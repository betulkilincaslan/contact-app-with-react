import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, clearErrors } from "../../redux/actions/authActions";
import { setAlert } from "../../redux/actions/alertActions";
import PropTypes from "prop-types";

const Login = ({
  auth: { error, isAuthenticated },
  history,
  loginUser,
  clearErrors,
  setAlert,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      loginUser({ email, password });
    }
  };

  return (
    <div className='auth-wrapper w-100'>
      <div className='d-flex justify-content-center'>
        <div className='auth-form-container w-100 px-1 py-5'>
          <h2 className='h5 fw-bold text-center text-uppercase'>Login</h2>
          <form className='w-75' onSubmit={onFormSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                className='form-control'
                placeholder='Email'
                type='email'
                name='email'
                value={email}
                onChange={onInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                className='form-control'
                placeholder='Password'
                type='password'
                name='password'
                value={password}
                onChange={onInputChange}
                minLength='6'
                required
              />
            </div>
            <input
              className='btn btn-auth w-100 mt-3'
              type='submit'
              value='Login'
            />
            <span>
              Not registered?
              <Link to='/register' className='ms-2'>
                Create an account
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  loginUser,
  clearErrors,
  setAlert,
})(Login);
