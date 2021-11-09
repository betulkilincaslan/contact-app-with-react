import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  filterContacts,
  clearFilter,
} from "../../redux/actions/contactActions";
import PropTypes from "prop-types";

const ContactFilter = ({ filterContacts, clearFilter, filtered }) => {
  // INITIALIZE REF VALUE:
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onInputChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className='mb-2 mt-4 mt-md-0'>
      <input
        className='form-control mb-3 filter-input'
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onInputChange}
      />
    </form>
  );
};

const mapStateToProps = (state) => ({
  filtered: state.contact.filtered,
});

ContactFilter.propTypes = {
  filtered: PropTypes.object,
  filterContacts: PropTypes.func,
  clearFilter: PropTypes.func,
};

export default connect(mapStateToProps, {
  filterContacts,
  clearFilter,
})(ContactFilter);
