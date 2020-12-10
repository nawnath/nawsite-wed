import axios from "axios";
import { toast } from "react-toastify";
import {
  signinUser,
  fetchUser,
  signupUser,
  forgotpassword,
  resetpassword,
  otpLogin,
  verifyOtp,
  boardsByEmail,
  signoutUser,
  verifyUser,
} from "./auth_actions";
declare let __isBrowser__: boolean;

let API_TOKEN;
const isMobileToken =
  __isBrowser__ &&
  /android|webos|iphone|ipad|ipod|blackberry|windows phone|iemobile|BB10|playbook|opera mini|ucbrowser|wpdesktop/i.test(
    navigator.userAgent.toLowerCase()
  );
API_TOKEN = isMobileToken
  ? "NGNlNTUwYTc0MjBjYzQzZTdiZTNhMmY1NjNhMThhOGU6OGI1NThkZDgtOGQ5ZS00OWYxLTk4MDAtNzYxMGEzOGNjYzNk"
  : "MWY5ZTNmNzFmN2M1ZTUyMjkwNjM2NGMzNmNjZTA3N2Q6M2RhMmI3OTgtNTY2MC00ZDRhLWJhZWQtNTZlMDI2MWRlYmZm";
axios.defaults.headers.common["Api-Token"] = API_TOKEN;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      !error.response ||
      [500, 501, 502, 503, 503, 404].indexOf(
        error.response && error.response.status
      ) > -1
    ) {
      toast.error("Something went wrong try again later ...");
    } else if (error.response && error.response.status === 401) {
      signoutUser();
    }
    return Promise.reject(error);
  }
);

export { signinUser };
export { fetchUser };
export { signupUser };
export { forgotpassword };
export { resetpassword };
export { otpLogin };
export { verifyOtp };
export { boardsByEmail };
export { signoutUser };
export { verifyUser };
