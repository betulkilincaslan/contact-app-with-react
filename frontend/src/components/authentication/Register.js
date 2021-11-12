import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../redux/actions/authActions";
import { setAlert } from "../../redux/actions/alertActions";
import PropTypes from "prop-types";

const Register = ({
  auth: { error, isAuthenticated },
  registerUser,
  clearErrors,
  setAlert,
  history,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { name, email, password, passwordConfirm } = user;

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== passwordConfirm) {
      setAlert("Passwords do not match", "danger");
    } else {
      registerUser({ name, email, password });
    }
  };

  return (
    <div className='auth-wrapper w-100'>
      <div className='d-flex justify-content-center'>
        <div className='auth-form-container w-100 px-1 py-5'>
          <h2 className='h5 fw-bold text-center text-uppercase'>
            Create An Account
          </h2>
          <form className='w-75' onSubmit={onFormSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                className='form-control'
                placeholder='Name'
                type='text'
                name='name'
                value={name}
                onChange={onInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
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
                required
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='passwordConfirm'>Confirm Password</label>
              <input
                className='form-control'
                placeholder='Confirm Password'
                type='password'
                name='passwordConfirm'
                value={passwordConfirm}
                onChange={onInputChange}
                required
                minLength='6'
              />
            </div>
            <input
              className='btn btn-auth w-100 mt-3'
              type='submit'
              value='Create Account'
            />
            <span>
              Have already an account?
              <Link to='/login' className='ms-2'>
                Login here
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

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  registerUser,
  clearErrors,
  setAlert,
})(Register);
