import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteContact,
  setCurrentContact,
  clearCurrentContact,
} from "../../redux/actions/contactActions";

const ContactItem = ({
  contact,
  deleteContact,
  setCurrentContact,
  clearCurrentContact,
}) => {
  const { _id, name, email, phone, type } = contact;

  const onDeleteContact = () => {
    deleteContact(_id);
    clearCurrentContact();
  };
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column gap-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='card-text fw-bold'>{name} </div>
          <span className='badge'>
            {/* <span
            className={
              "badge  " +
              (type === "professional" ? "badge-info" : "badge-primary")
            }
          > */}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
        <ul className='list-group'>
          {email && (
            <li>
              <i className='fas fa-envelope-open'></i> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className='fas fa-phone'></i> {phone}
            </li>
          )}
        </ul>
        <p>
          <button
            className='btn btn-edit btn-sm me-2'
            onClick={() => setCurrentContact(contact)}
          >
            Edit
          </button>
          <button className='btn btn-delete btn-sm' onClick={onDeleteContact}>
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

ContactItem.protoTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
  setCurrentContact: PropTypes.func.isRequired,
  clearCurrentContact: PropTypes.func.isRequired,
};
export default connect(null, {
  deleteContact,
  setCurrentContact,
  clearCurrentContact,
})(ContactItem);
