import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addContact,
  clearCurrentContact,
  updateContact,
} from "../../redux/actions/contactActions";
import PropTypes from "prop-types";

const ContactForm = ({
  addContact,
  clearCurrentContact,
  updateContact,
  current,
}) => {
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = contact;

  const onInputChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const clearAll = () => {
    clearCurrentContact();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h2 className='h5 text-center'>
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          className='form-control'
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={onInputChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='name'>Email</label>
        <input
          className='form-control'
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onInputChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='name'>Phone Number</label>
        <input
          className='form-control'
          placeholder='Phone Number'
          name='phone'
          value={phone}
          onChange={onInputChange}
        />
      </div>
      <div className='mt-2 d-flex'>
        <span className='me-2'> Contact Type : </span>
        <div className='d-flex flex-column flex-sm-row'>
          <div className='d-flex align-items-center'>
            <input
              className='me-1'
              type='radio'
              name='type'
              value='personal'
              onChange={onInputChange}
              checked={type === "personal"}
            />
            <span className='me-3'>Personal</span>
          </div>
          <div className='d-flex align-items-center'>
            <input
              className='me-1'
              type='radio'
              name='type'
              value='professional'
              onChange={onInputChange}
              checked={type === "professional"}
            />
            <span>Professional</span>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <input
          type='submit'
          value={current ? "Update Contact" : "Add Contact"}
          className='btn btn-add w-100'
        />
        {current && (
          <div>
            <button className='btn btn-clear w-100 mt-2' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  current: state.contact.current,
});

ContactForm.propTypes = {
  current: PropTypes.object,
  addContact: PropTypes.func,
  clearCurrentContact: PropTypes.func,
  updateContact: PropTypes.func,
};

export default connect(mapStateToProps, {
  addContact,
  clearCurrentContact,
  updateContact,
})(ContactForm);
