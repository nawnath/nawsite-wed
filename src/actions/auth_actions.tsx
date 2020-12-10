import axios from "axios";

import { browserHistory } from "../history";
const history = browserHistory;
import { toast } from "react-toastify";
import {
  AUTH_USER,
  AUTH_ERROR,
  LOGOUT_USER,
  SAVE_USER_DETAILS,
  GET_BOARDS_BY_EMAIL,
  SHOW_LOADER,
  HIDE_LOADER,
} from "./types";
import { API_URL } from "./../services/apiUrls";
import {
  saveAccessCredentials,
  deleteToken,
  setCookie,
} from "../credentials/access_credentials";
import { GetHeaders } from "../credentials/access_headers";

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signupUser(payload) {
  return (dispatch) => {
    return axios
      .post(`${API_URL}auth/signup`, payload)
      .then((response) => {
        dispatch({
          type: AUTH_USER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        return { error: error.response.data };
      });
  };
}

export function signoutUser() {
  deleteToken();
  history.push("/login");
  return {
    type: LOGOUT_USER,
  };
}

export function signinUser({ email, password }) {
  return (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
    });
    const auth = {
      email,
      password,
    };
    const headers = GetHeaders();
    return axios
      .post(`${API_URL}auth/login`, auth, headers)
      .then((response) => {
        dispatch({
          type: AUTH_USER,
        });
        setCookie("Access-Token", response.data.accessToken);
        dispatch(fetchUser());
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADER,
        });
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        return { error: error.response.data };
      });
  };
}

export function fetchUser() {
  return (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
    });
    return axios
      .get(`${API_URL}user/profile`, GetHeaders())
      .then((response) => {
        dispatch({
          type: SAVE_USER_DETAILS,
          payload: response.data,
        });
        saveAccessCredentials(response.data);
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function forgotpassword({ email }) {
  return (dispatch) => {
    const headers = GetHeaders();
    dispatch({
      type: SHOW_LOADER,
    });
    return axios
      .post(`${API_URL}auth/forgetPassword`, { email }, headers)
      .then((response) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADER,
        });
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        return { error: error.response.data };
      });
  };
}

export function resetpassword({ email, newPassword }) {
  return (dispatch) => {
    const headers = GetHeaders();
    dispatch({
      type: SHOW_LOADER,
    });
    return axios
      .post(
        `${API_URL}auth/resetPassword`,
        {
          email,
          newPassword,
        },
        headers
      )
      .then((response) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function otpLogin({ email }) {
  return (dispatch) => {
    const headers = GetHeaders();
    dispatch({
      type: SHOW_LOADER,
    });
    return axios
      .post(`${API_URL}auth/otpLogin`, { email }, headers)
      .then((response) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function verifyOtp({ email, otp }) {
  return (dispatch) => {
    const headers = GetHeaders();
    dispatch({
      type: SHOW_LOADER,
    });
    return axios
      .post(`${API_URL}verify/otp`, { email, otp }, headers)
      .then((response) => {
        dispatch({
          type: AUTH_USER,
        });
        setCookie("Access-Token", response.data.accessToken);
        dispatch(fetchUser());
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function boardsByEmail() {
  return (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
    });
    return axios
      .get(`${API_URL}registeredInstitute/boards`, GetHeaders())
      .then((response) => {
        dispatch({
          type: GET_BOARDS_BY_EMAIL,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}

export function verifyUser({ id }) {
  return (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
    });
    const auth = {
      id,
    };
    const headers = GetHeaders();
    return axios
      .post(`${API_URL}verify/email`, auth, headers)
      .then((response) => {
        dispatch({
          type: HIDE_LOADER,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        dispatch({
          type: HIDE_LOADER,
        });
        return { error: error.response.data };
      });
  };
}
