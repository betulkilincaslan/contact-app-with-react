import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "./types";
import axios from "axios";

// GET ALL USER'S CONTACTS FROM DB
export const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contacts");

    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// ADD CONTACT
export const addContact = (contact) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/contacts", contact, config);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// DELETE CONTACT
export const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// UPDATE CONTACT
export const updateContact = (contact) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// CLEAR CONTACTS
export const clearContacts = () => (dispatch) => {
  dispatch({
    type: CLEAR_CONTACTS,
  });
};

// SET CURRENT CONTACT
export const setCurrentContact = (contact) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_CONTACT,
    payload: contact,
  });
};

// CLEAR CURRENT CONTACT
export const clearCurrentContact = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_CONTACT,
  });
};

// FILTER CONTACTS
export const filterContacts = (text) => (dispatch) => {
  dispatch({
    type: FILTER_CONTACTS,
    payload: text,
  });
};

// CLEAR FILTER
export const clearFilter = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTER,
  });
};
