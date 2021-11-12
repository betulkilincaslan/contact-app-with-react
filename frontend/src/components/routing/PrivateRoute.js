import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ auth: { isAuthenticated, loading }, children }) => {
  return !isAuthenticated && !loading ? <Navigate to='/login' /> : children;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(PrivateRoute);
