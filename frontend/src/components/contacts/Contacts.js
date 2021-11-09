import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactItem from "./ContactItem";

const Contacts = ({ contact: { contacts, filtered, loading } }) => {
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <p className='add-contact-msg'>Please add a contact</p>;
  }
  return (
    <>
      {contacts !== null && !loading ? (
        filtered !== null ? (
          filtered.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        ) : (
          contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        )
      ) : (
        <i class='fas fa-spinner fa-pulse'></i>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  contact: state.contact,
});

Contacts.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Contacts);
