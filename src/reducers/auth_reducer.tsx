import {
  AUTH_ERROR,
  AUTH_USER,
  LOGOUT_USER,
  SAVE_USER_DETAILS,
} from "../actions/types";

export default function (
  state = {
    authenticated: false,
    email: undefined,
    mobile: undefined,
    firstName: undefined,
    lastName: undefined,
  },
  action: any
) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case LOGOUT_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SAVE_USER_DETAILS:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
