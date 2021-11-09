import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { clearContacts } from "../redux/actions/contactActions";
import PropTypes from "prop-types";

const Navbar = ({
  logoutUser,
  clearContacts,
  auth: { isAuthenticated, user },
}) => {
  const onLogoutUser = () => {
    logoutUser();
    clearContacts();
  };

  const authLinks = (
    <>
      <li className='h6'>Hello {user && user.name}</li>
      <li className='h6'>
        <a href='#!' onClick={onLogoutUser}>
          <i className='fas fa-sign-out-alt'></i>{" "}
          <span className='d-none d-sm-inline-block'>Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className='h6'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='h6'>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );
  return (
    <nav className='navbar-wrapper'>
      <div className='container d-flex justify-content-between align-items-center h-100'>
        <h1 className='h5'>
          <i className='far fa-address-book me-2 d-none d-sm-inline-block'></i>
          Contact App
        </h1>
        <ul className='d-flex gap-3 m-0'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearContacts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  logoutUser,
  clearContacts,
})(Navbar);
