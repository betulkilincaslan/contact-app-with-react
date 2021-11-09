import React, { useEffect } from "react";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import Contacts from "../contacts/Contacts";
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";
import { getContacts } from "../../redux/actions/contactActions";
import PropTypes from "prop-types";

const Home = ({ loadUser, getContacts }) => {
  useEffect(() => {
    loadUser();
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='row mt-3'>
      <div className='col-12 col-md-6'>
        <div className='contact-form-wrapper w-100 px-4 py-5'>
          <ContactForm />
        </div>
      </div>
      <div className='col-12 col-md-6'>
        <div className='filter-contacts-wrapper w-100'>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
};

export default connect(null, {
  loadUser,
  getContacts,
})(Home);
