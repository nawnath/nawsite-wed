import axios from "axios";

import { ADD_ENQUIRY } from "./types";
import { API_URL } from "./../services/apiUrls";
import { GetHeaders } from "./../credentials/access_headers";

export function addEnquiry(payload) {
  return (dispatch) => {
    return axios
      .post(`${API_URL}enquiry/`, payload, GetHeaders())
      .then((response) => {
        dispatch({
          type: ADD_ENQUIRY,
          payload: response.data,
        });
        return { success: "Success" };
      })
      .catch((error) => {
        console.log("error", error);
        return { error: error.response.data.error.message };
      });
  };
}
