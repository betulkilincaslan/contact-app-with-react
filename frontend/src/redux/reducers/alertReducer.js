import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  alerts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] };

    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
};
